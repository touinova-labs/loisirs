INSERT INTO auctions (
    title,
    description,
    main_image,
    images,
    location_name,
    start_price,
    current_price,
    reserve_price,
    buy_now_price,
    min_bid_increment,
    bid_step_type,
    start_at,
    end_at,
    status,
    type,
    is_verified,
    is_limited,
    has_delivery,
    attributes,
    partner_name,
    enabled
) VALUES (
    'L''Évasion Suspendue : Villa Minimaliste à Santorin',
    '### Une Immersion entre Ciel et Mer
Découvrez une propriété architecturale unique, perchée sur les falaises d''Oia. Cette villa redéfinit le luxe par sa simplicité absolue et ses vues panoramiques sur la Caldeira.

**Ce qui est inclus :**
* **4 Nuits d''exception** pour deux personnes dans la suite Master.
* **Transfert privé** en héliocoptère depuis Athènes.
* **Chef privé** (1 étoile Michelin) pour un dîner gastronomique au coucher du soleil.
* **Accès exclusif** au spa souterrain taillé dans la roche volcanique.

*Note : Cette offre est une édition limitée, valable pour une réservation entre juin et septembre 2026.*',
    'https://images.unsplash.com/photo-1570051008101-93d58ad32a21?q=80&w=2000&auto=format&fit=crop',
    ARRAY[
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2000&auto=format&fit=crop'
    ],
    'Oia, Grèce',
    1500.00,
    1500.00,
    4500.00,
    8500.00,
    250.00,
    'fixed',
    NOW(),
    NOW() + INTERVAL '7 days',
    'active',
    'auction',
    true,
    true,
    false,
    '{
        "surface": "120m2",
        "piscine": "Infinity Pool privative",
        "services": ["Conciergerie 24/7", "Majordome", "Wifi 6"],
        "experience_type": "Gastronomie & Détente"
    }'::jsonb,
    'Hellenic Luxury Estates',
    true
);