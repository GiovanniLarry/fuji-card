-- Fuji Card Shop - Missing Admin Settings Table
-- Required for PayFast, Paystack and Crypto Wallet configuration via Admin Dashboard.

CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed initial settings if empty
INSERT INTO admin_settings (key, value)
VALUES 
    ('paystack', '{"publicKey": "", "secretKey": ""}'::jsonb),
    ('payfast', '{"merchantId": "", "merchantKey": "", "passphrase": "", "url": "https://www.payfast.co.za/eng/process"}'::jsonb),
    ('wallets', '{"BTC": {"label": "Bitcoin", "address": ""}, "ETH": {"label": "Ethereum", "address": ""}}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Grant access
ALTER TABLE admin_settings DISABLE ROW LEVEL SECURITY;
GRANT ALL ON admin_settings TO anon, authenticated, postgres, service_role;

-- Log verification
SELECT * FROM admin_settings;
