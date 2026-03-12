-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table des Enchères
CREATE TABLE auctions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    main_image TEXT,
    images TEXT[] DEFAULT '{}',
    attributes JSONB DEFAULT '{}'::jsonb,
    location_name TEXT,
    
    -- Prix et Paramètres
    start_price DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    current_price DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    reserve_price DECIMAL(10,2) DEFAULT 0.00,
    buy_now_price DECIMAL,
    
    -- Temps
    start_at TIMESTAMPTZ DEFAULT NOW(),
    end_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Statuts et Badges
    status TEXT DEFAULT 'upcoming', -- upcoming, active, finished_reserve_not_met, finished_unpaid, finished_paid, completed
    type TEXT DEFAULT 'auction',
    has_delivery BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_limited BOOLEAN DEFAULT false
);

-- 2. Table des Mises (Bids)
CREATE TABLE bids (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION handle_new_bid()
RETURNS TRIGGER AS $$
DECLARE
    v_current_price DECIMAL;
    v_end_at TIMESTAMPTZ;
    v_status TEXT;
BEGIN
    -- 1. Verrouillage et récupération avec vérification d'existence
    SELECT current_price, end_at, status 
    INTO v_current_price, v_end_at, v_status
    FROM auctions
    WHERE id = NEW.auction_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'ENCHERE_INTROUVABLE';
    END IF;

    -- Erreur : Statut non actif ou temps écoulé
    IF v_status IS DISTINCT FROM 'active' OR v_end_at < NOW() THEN
        RAISE EXCEPTION 'ENCHERE_TERMINEE';
    END IF;

    -- Erreur : Prix insuffisant
    IF NEW.amount <= v_current_price THEN
        RAISE EXCEPTION 'MISE_INSUFFISANTE:%', v_current_price;
    END IF;

    -- 6. Anti-sniping
    IF (v_end_at - NOW()) < INTERVAL '30 seconds' THEN
        v_end_at := NOW() + INTERVAL '60 seconds';
    END IF;

    -- 7. Mise à jour Enchère
    UPDATE auctions 
    SET current_price = NEW.amount,
        end_at = v_end_at,
        updated_at = NOW()
    WHERE id = NEW.auction_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Vue pour les clients (Gagnants)
CREATE OR REPLACE VIEW auction_winners AS
SELECT DISTINCT ON (a.id)
    a.id AS auction_id,
    a.title,
    a.current_price,
    a.reserve_price,
    a.end_at,
    a.status,
    CASE 
        WHEN a.current_price >= a.reserve_price THEN b.user_id 
        ELSE NULL 
    END AS winner_id,
    CASE 
        WHEN a.current_price >= a.reserve_price THEN b.amount 
        ELSE NULL 
    END AS winning_bid
FROM auctions a
LEFT JOIN bids b ON a.id = b.auction_id
ORDER BY a.id, b.amount DESC, b.created_at ASC;

-- Vue pour l'Admin Monitor
CREATE OR REPLACE VIEW admin_auction_monitor AS
SELECT 
    a.id,
    a.title,
    a.status,
    a.current_price,
    a.reserve_price,
    a.end_at,
    a.start_at,
    (SELECT count(*) FROM bids b WHERE b.auction_id = a.id) as total_bids,
    u.email as winner_email,
    u.raw_user_meta_data->>'full_name' as winner_name
FROM auctions a
LEFT JOIN LATERAL (
    SELECT user_id FROM bids b 
    WHERE b.auction_id = a.id 
    ORDER BY amount DESC LIMIT 1
) last_bid ON true
LEFT JOIN auth.users u ON u.id = last_bid.user_id
ORDER BY a.end_at DESC;


-- Index
CREATE INDEX idx_auctions_status ON auctions(status);
CREATE INDEX idx_auctions_end_at ON auctions(end_at);
CREATE INDEX idx_bids_auction_id ON bids(auction_id);
CREATE INDEX idx_auctions_attributes ON auctions USING gin (attributes);

-- RLS (Sécurité)
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Auctions" ON auctions FOR SELECT USING (true);
CREATE POLICY "Admin All Auctions" ON auctions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Bids" ON bids FOR SELECT USING (true);
CREATE POLICY "Auth Insert Bids" ON bids FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Realtime configuration
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;
ALTER PUBLICATION supabase_realtime ADD TABLE auctions;
ALTER PUBLICATION supabase_realtime ADD TABLE bids;

ALTER TABLE auctions 
ADD COLUMN IF NOT EXISTS booking_url TEXT, -- Pour les agences avec réservation en ligne
ADD COLUMN IF NOT EXISTS partner_email TEXT, -- Pour les agences traditionnelles (mise en relation)
ADD COLUMN IF NOT EXISTS partner_name TEXT; -- Pour afficher le nom du partenaire sur l'enchère
