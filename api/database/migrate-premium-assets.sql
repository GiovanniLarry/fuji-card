-- Premium One Piece Asset Migration
-- This script adds the newly generated premium images and products to the Supabase database.

-- Temporarily disable RLS for migration
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Ensure unique constraint on name for upserts
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_name_key') THEN
        ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name);
    END IF;
END $$;

-- 1. Insert/Update Premium One Piece Products
INSERT INTO products (name, description, price, image_url, category_id, card_type, set_name, rarity, condition, language, stock, featured)
SELECT 
  p.name, p.description, p.price, p.image, c.id,
  p.card_type, p.set_name, p.rarity, p.condition::card_condition,
  p.language, p.stock, p.featured
FROM (
  VALUES
    ('OP-09 The New Emperor Booster Box Japanese ONE PIECE CARD', 'Factory sealed booster box of the monumental OP-09 set featuring the new emperors.', 85.00, '/onepiece/op09_booster_box_premium.png', 'onepiece', 'Sealed Product', 'OP-09', 'Booster Box', 'Sealed', 'Japanese', 45, true),
    ('PRB-01 One Piece Card Game THE BEST Booster Box', 'The highly anticipated PRB-01 Reprint Booster Box. Features high-class rarity and iconic reprints.', 78.00, '/onepiece/prb01_the_best_box_premium.png', 'onepiece', 'Sealed Product', 'PRB-01', 'Booster Box', 'Sealed', 'Japanese', 60, true),
    ('Official One Piece Card Game Sleeves - Shanks (Set 10)', 'Protect your cards with style. Official Japanese Bandai sleeves featuring Shanks.', 15.00, '/onepiece/shanks_sleeves_set10_premium.png', 'accessories', 'Accessories', 'Accessories', 'Limited Supply', 'Sealed', 'Japanese', 100, false),
    ('ST-25 Start Deck BLUE - Buggy the Star Clown', 'The 2024 Buggy Start Deck. Ready-to-play blue control deck with exclusive leader art.', 22.00, '/onepiece/st25_buggy_deck_premium.png', 'onepiece', 'Sealed Product', 'ST-25', 'Starter Deck', 'Sealed', 'Japanese', 25, true),
    ('ST-26 Start Deck PURPLE - Monkey.D.Luffy', 'The 2024 Luffy Purple Start Deck. Focuses on ramp and high-impact attackers.', 22.00, '/onepiece/st26_luffy_deck_premium.png', 'onepiece', 'Sealed Product', 'ST-26', 'Starter Deck', 'Sealed', 'Japanese', 30, true),
    ('Japanese Direct Import One Piece Booster Box Special', 'A special Japanese direct import booster box. Guaranteed authenticity.', 75.00, '/onepiece/direct_import_one_piece_box_special.png', 'onepiece', 'Sealed Product', 'Direct Import', 'Booster Box', 'Sealed', 'Japanese', 15, false),
    ('Japanese 2025 Anniversary Special Multi-Box Set', 'A limited edition 2025 Multi-Box set containing exclusive anniversary packs and promos.', 145.00, '/onepiece/anniversary_2025_multi_box_premium.png', 'onepiece', 'Sealed Product', 'Anniversary Special', 'Limited Box Set', 'Sealed', 'Japanese', 5, true),
    ('OP-09 Buggy Wanted Poster Alt Art PSA 10', 'The hilarious and iconic Buggy Wanted Poster Alt Art from OP-09, graded PSA 10.', 320.00, '/onepiece/buggy_wanted_poster_op09_psa10_premium.png', 'onepiece', 'Character', 'Emperors in the New World', 'R (Alt Art)', 'Mint', 'Japanese', 1, true),
    ('OP-11 Luffy 3rd Anniversary Gold Promo PSA 10', 'Ultra-exclusive 3rd Anniversary Gold stamped Luffy from OP-11. Graded PSA 10 Gem Mint.', 1500.00, '/onepiece/luffy_3rd_anniv_gold_op11_psa10_premium.png', 'onepiece', 'Character', '3rd Anniversary', 'Gold Promo', 'Mint', 'Japanese', 1, true),
    ('PRB-02 Sanji Manga Alternative Art PSA 8', 'The elegant Sanji Manga Art from PRB-02. Professionally graded PSA 8 Near Mint-Mint.', 850.00, '/onepiece/sanji_manga_prb02.webp', 'onepiece', 'Character', 'PRB-02', 'SEC (Manga Art)', 'Near Mint', 'Japanese', 1, true),
    ('PRB-01 Zoro Manga Alt Art PSA 10 - THE BEST', 'Roronoa Zoro Manga Art from the PRB-01 High Class set. Professionally graded PSA 10 Gem Mint.', 1850.00, '/onepiece/zoro_manga_prb01.webp', 'onepiece', 'Character', 'PRB-01 THE BEST', 'SEC (Manga Art)', 'Mint', 'Japanese', 1, true)
) AS p(name, description, price, image, category, card_type, set_name, rarity, condition, language, stock, featured)
JOIN categories c ON c.name = p.category
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  category_id = EXCLUDED.category_id,
  card_type = EXCLUDED.card_type,
  set_name = EXCLUDED.set_name,
  rarity = EXCLUDED.rarity,
  condition = EXCLUDED.condition,
  language = EXCLUDED.language,
  stock = EXCLUDED.stock,
  featured = EXCLUDED.featured,
  updated_at = NOW();

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify migration
SELECT name, image_url, stock FROM products WHERE name LIKE 'OP-09%' OR name LIKE 'PRB-01%';
