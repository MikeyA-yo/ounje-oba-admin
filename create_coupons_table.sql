-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_purchase_amount DECIMAL(10, 2) DEFAULT 0,
    max_discount_amount DECIMAL(10, 2),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'disabled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users (or admins)
CREATE POLICY "Enable read access for all users" ON coupons
    FOR SELECT USING (true); -- Adjust this based on your actual auth needs (e.g., auth.role() = 'service_role' or admin check)

-- Allow insert/update/delete for authenticated users (admins)
CREATE POLICY "Enable insert for authenticated users" ON coupons
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON coupons
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON coupons
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some dummy data
INSERT INTO coupons (code, description, discount_type, discount_value, status, end_date)
VALUES 
    ('WELCOME20', 'Welcome discount for new users', 'percentage', 20.00, 'active', NOW() + INTERVAL '30 days'),
    ('SUMMER10', 'Summer sale discount', 'percentage', 10.00, 'active', NOW() + INTERVAL '60 days'),
    ('SAVE500', 'Flat 500 Naira off', 'fixed_amount', 500.00, 'active', NOW() + INTERVAL '15 days')
ON CONFLICT (code) DO NOTHING;
