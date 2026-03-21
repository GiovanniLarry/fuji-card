import express from 'express';
import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { localProductStore } from '../data/flagship_products.js';

const router = express.Router();

// --- SETTINGS MIGRATION (SUPABASE) ---
const getSetting = async (key, defaultValue) => {
    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', key)
            .order('updated_at', { ascending: false })
            .limit(1);
            
        if (error || !data || data.length === 0) return defaultValue;
        return data[0].value;
    } catch (e) {
        return defaultValue;
    }
};

const updateSetting = async (key, value) => {
    try {
        const { error } = await supabase
            .from('admin_settings')
            .upsert(
                { key, value, updated_at: new Date().toISOString() },
                { onConflict: 'key' }
            );
        if (error) throw error;
    } catch (e) {
        console.error(`Failed to update setting ${key}`, e);
    }
};
// --- END SETTINGS MIGRATION ---

// Multer config — saves files directly to client/public as <coin>-qr.png
const qrStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = path.join(__dirname, '../../client/public');
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const coin = (req.body.coin || 'btc').toLowerCase();
        cb(null, `${coin}-qr.png`);
    }
});
const uploadQR = multer({ storage: qrStorage, limits: { fileSize: 5 * 1024 * 1024 } });

// Publicly available Paystack Key (needed for checkout)
router.get('/paystack-key', async (req, res) => {
    const paystack = await getSetting('paystack', { publicKey: '' });
    res.json({ publicKey: paystack.publicKey });
});
const JWT_SECRET = process.env.JWT_SECRET || 'fujicard-secret-key-2024';

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err || user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized as admin' });
        }
        req.user = user;
        next();
    });
};

// Apply middleware to all admin routes
router.use(authenticateAdmin);

// Get global stats
router.get('/stats', async (req, res) => {
    try {
        const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
        const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
        const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

        res.json({
            users: userCount || 0,
            products: productCount || 0,
            orders: orderCount || 0
        });
    } catch (error) {
        console.warn('Admin stats error (Supabase might be disconnected):', error);
        // Fallback stats
        res.json({
            users: 0,
            products: localProductStore.length,
            orders: 0,
            fallbackMode: true
        });
    }
});

// Debug environment configuration (Redacted values)
router.get('/debug-env', (req, res) => {
    res.json({
        has_url: !!process.env.SUPABASE_URL,
        has_key: !!process.env.SUPABASE_ANON_KEY,
        keys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
    });
});

// Sync local products to Supabase
router.post('/sync-flagship', async (req, res) => {
    try {
        console.log('[Admin] Starting flagship inventory sync...');
        
        // 1. Fetch categories for mapping
        const { data: catData, error: catError } = await supabase.from('categories').select('id, name');
        if (catError) throw catError;

        const catMap = {};
        catData.forEach(c => {
            const slug = c.name.toLowerCase().replace(/[^a-z]/g, '');
            catMap[slug] = c.id;
        });

        // 2. Clear old products to avoid duplicates during mass-seed
        await supabase.from('products').delete().neq('name', '___SYSTEM_RESERVED___');

            // 3. Prepare products
            const productsToInsert = localProductStore.map(p => {
                const slug = (p.category || 'other').toLowerCase().replace(/[^a-z]/g, '');
                const categoryId = catMap[slug] || null;

                // Map condition to Database ENUM values ('Mint', 'Near Mint', 'Excellent', 'Good', 'Fair', 'Poor', 'Sealed')
                let dbCondition = 'Mint'; 
                const rawCon = (p.condition || 'Mint').trim();
                
                if (rawCon.includes('Sealed')) dbCondition = 'Sealed';
                else if (rawCon === 'NM' || rawCon === 'Near Mint') dbCondition = 'Near Mint';
                else if (rawCon === 'M' || rawCon === 'Mint') dbCondition = 'Mint';
                else if (rawCon === 'Excellent' || rawCon === 'EX') dbCondition = 'Excellent';
                else if (rawCon === 'Good') dbCondition = 'Good';
                else if (rawCon === 'Fair') dbCondition = 'Fair';
                else if (rawCon === 'Poor') dbCondition = 'Poor';

                return {
                    name: p.name,
                    description: p.description || '',
                    price: parseFloat(p.price) || 0,
                    image_url: p.image,
                    category_id: categoryId,
                    card_type: p.cardType || 'Character',
                    set_name: p.set || 'N/A',
                    rarity: p.rarity || 'N/A',
                    condition: dbCondition,
                    language: p.language || 'Japanese',
                    stock: parseInt(p.stock) || 0,
                    featured: p.featured || false
                };
            });

        // 4. Batch Insert
        const { error: insertError } = await supabase.from('products').insert(productsToInsert);
        if (insertError) throw insertError;

        res.json({ 
            message: 'Flagship inventory synchronized successfully!', 
            count: productsToInsert.length 
        });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Sync failed: ' + (error.message || JSON.stringify(error)) });
    }
});

// Add a new product
router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;

        // Ensure you use the right category_id - for now assume client sends it or map name -> id
        if (newProduct.category_name) {
            const { data: catData } = await supabase.from('categories').select('id').eq('name', newProduct.category_name).single();
            if (catData) newProduct.category_id = catData.id;
            delete newProduct.category_name;
        }

        if (!supabase) {
            return res.status(501).json({ error: 'Database disconnected. Cannot create new products locally.' });
        }

        const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product', details: error.message });
    }
});

// Bulk update stock for sold-out products
router.put('/products/bulk-stock', async (req, res) => {
    try {
        const { productIds, stockToAdd } = req.body;
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ error: 'No products selected' });
        }

        const addedStock = parseInt(stockToAdd, 10);
        if (isNaN(addedStock) || addedStock <= 0) {
            return res.status(400).json({ error: 'Invalid stock number' });
        }

        console.log(`[Admin] Bulk stock update: adding ${addedStock} to ${productIds.length} products`);

        const errors = [];
        // Update each product's stock
        await Promise.all(productIds.map(async (pid) => {
            const { data: product, error: fetchErr } = await supabase
                .from('products')
                .select('stock')
                .eq('id', pid)
                .single();

            if (fetchErr || !product) {
                errors.push(`Product ${pid}: fetch failed - ${fetchErr?.message}`);
                return;
            }

            const currentStock = Number(product.stock) || 0;
            const newStock = currentStock + addedStock;
            
            console.log(`[Admin] Updating stock for ${pid}: ${currentStock} -> ${newStock}`);

            const { data: updatedData, error: updateErr } = await supabase
                .from('products')
                .update({ stock: newStock, updated_at: new Date().toISOString() })
                .eq('id', pid)
                .select();

            if (updateErr) {
                errors.push(`Product ${pid}: update failed - ${updateErr.message}`);
            } else if (!updatedData || updatedData.length === 0) {
                errors.push(`Product ${pid}: no rows updated (is RLS enabled and blocking updates?)`);
            }
        }));

        if (errors.length > 0) {
            console.error('Bulk stock update results contains errors:', errors);
            return res.status(500).json({ error: 'Some or all products failed to update', details: errors });
        }

        res.json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error('Bulk stock update error:', error);
        res.status(500).json({ error: 'Failed to update stock in bulk', details: error.message });
    }
});

// Update an existing product
router.put('/products/:id', async (req, res) => {
    try {
        const updateData = req.body;

        if (updateData.category_name) {
            const { data: catData } = await supabase.from('categories').select('id').eq('name', updateData.category_name).single();
            if (catData) updateData.category_id = catData.id;
            delete updateData.category_name;
        }

        // Clean fields we shouldn't update manually here
        delete updateData.id;
        delete updateData.categories;
        delete updateData.created_at;
        delete updateData.updated_at;

        // Map any boolean strings back to bool
        if (updateData.featured !== undefined) updateData.featured = updateData.featured === 'true' || updateData.featured === true;
        if (updateData.promo !== undefined) updateData.promo = updateData.promo === 'true' || updateData.promo === true;

        console.log(`[Admin] Updating product ${req.params.id} with data:`, updateData);

        if (supabase) {
            const { data, error } = await supabase.from('products').update(updateData).eq('id', req.params.id).select();
            if (error) throw error;
            
            if (!data || data.length === 0) {
                return res.status(404).json({ 
                    error: 'Product not found or update blocked by database policies (RLS).',
                    details: 'Ensure the Product ID is correct and you are using a Service Role Key if RLS is enabled.'
                });
            }
            
            return res.json(data[0]);
        } else {
            // FALLBACK: Update local memory and attempt to persist to store.js
            console.log('⚠️ [Admin] Supabase disconnected. Updating local store files...');
            
            // Try updating fallbackProducts (which is the live reference in memory)
            // Note: need to import it or use a shared store
            // For now, let's at least return a successful simulation message or a 501
            res.status(501).json({ 
                error: 'Database not connected.', 
                details: 'Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file to persist changes.' 
            });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        if (!supabase) {
            return res.status(501).json({ error: 'Database disconnected. Cannot delete products locally.' });
        }

        const { error } = await supabase.from('products').delete().eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
});


// Category Management
router.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const { data, error } = await supabase.from('categories').insert([{ name }]).select().single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Failed to add category' });
    }
});

router.delete('/categories/:id', async (req, res) => {
    try {
        // Can't delete category if it has products attached (FK constraint) unless CASCADE
        const { error } = await supabase.from('categories').delete().eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category. Ensure no products are left inside it.' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id, username, email, created_at, is_banned').order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update user ban status
router.put('/users/:id/ban', async (req, res) => {
    try {
        const { is_banned } = req.body;
        const { error } = await supabase.from('users').update({ is_banned }).eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error banning user:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const { error } = await supabase.from('users').delete().eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete ALL users (nuclear option — admin confirmed)
router.delete('/users', async (req, res) => {
    try {
        const { error } = await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // neq trick to delete all rows
        if (error) throw error;
        res.json({ message: 'All users deleted successfully' });
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).json({ error: 'Failed to delete all users', details: error.message });
    }
});

// Delete ALL orders
router.delete('/orders', async (req, res) => {
    try {
        const { error } = await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) throw error;
        res.json({ message: 'All orders deleted successfully' });
    } catch (error) {
        console.error('Error deleting all orders:', error);
        res.status(500).json({ error: 'Failed to delete all orders', details: error.message });
    }
});

// Get all orders for tracking
router.get('/orders', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                users ( username, email )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

// Get recent transactions for notifications
router.get('/notifications', async (req, res) => {
    try {
        // Fetch the 10 most recent orders with their associated users if any
        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                total,
                currency,
                payment_method,
                created_at,
                user_id,
                users ( username, email )
            `)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        // Format the notifications
        const notifications = data.map(order => ({
            id: order.id,
            order_number: order.order_number,
            amount: order.total,
            currency: order.currency,
            method: order.payment_method || 'Unknown',
            time: order.created_at,
            customer: order.users ? order.users.username : 'Guest Checkout',
            email: order.users ? order.users.email : 'N/A',
            isRead: false // In a real app we would store read status in DB
        }));

        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

// Get current crypto wallet config (public)
router.get('/crypto-wallets', async (req, res) => {
    const wallets = await getSetting('wallets', {});
    res.json(wallets);
});

// Update a single coin's wallet address and trust link
router.put('/crypto-wallets/:symbol', authenticateAdmin, async (req, res) => {
    const { symbol } = req.params;
    const { address, trustLink } = req.body;
    const wallets = await getSetting('wallets', {});
    if (!wallets[symbol]) return res.status(404).json({ error: 'Unknown coin symbol' });
    wallets[symbol] = { ...wallets[symbol], address, trustLink };
    await updateSetting('wallets', wallets);
    res.json({ message: `${symbol} wallet updated`, config: wallets[symbol] });
});

// Upload a new QR code image for a coin
router.post('/crypto-wallets/qr', authenticateAdmin, uploadQR.single('qr'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ message: 'QR code uploaded successfully', filename: req.file.filename });
});

// Get current Paystack config (admin only)
router.get('/paystack-config', authenticateAdmin, async (req, res) => {
    const paystack = await getSetting('paystack', {});
    res.json(paystack);
});

// Update Paystack config
router.put('/paystack-config', authenticateAdmin, async (req, res) => {
    const { publicKey, secretKey } = req.body;
    const paystack = { publicKey, secretKey };
    await updateSetting('paystack', paystack);
    res.json({ message: 'Paystack settings updated', config: paystack });
});

// Get current PayFast config (admin only)
router.get('/payfast-config', authenticateAdmin, async (req, res) => {
    const payfast = await getSetting('payfast', {});
    res.json(payfast);
});

// Update PayFast config
router.put('/payfast-config', authenticateAdmin, async (req, res) => {
    const { merchantId, merchantKey, passphrase, url } = req.body;
    const payfast = { merchantId, merchantKey, passphrase, url };
    await updateSetting('payfast', payfast);
    res.json({ message: 'PayFast settings updated', config: payfast });
});

export default router;
