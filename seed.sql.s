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
  status, 
  type, 
  start_at, 
  end_at, 
  attributes, 
  partner_name
) VALUES 
(
  'Palais de l''Atlas & Spa : Suite Royale avec Vue',
  'Nichée au cœur d''une palmeraie millénaire, cette retraite hors du temps redéfinit l''art de vivre. Votre séjour commence par une traversée des jardins odorants où jasmin et fleur d''oranger embaument l''air du soir. Votre Suite Royale, véritable chef-d''œuvre d''artisanat ciselé, offre une terrasse privée suspendue face aux cimes enneigées de l''Atlas. Profitez d''un accès exclusif au spa de 2000m², où les rituels ancestraux au savon noir et à l''eucalyptus vous transportent dans une bulle de sérénité absolue.',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop'
  ],
  'Marrakech, Maroc',
  450.00, 450.00, 850.00, 1800.00,
  'active', 'auction',
  NOW(), NOW() + INTERVAL '7 days',
  '{"type": "hotel", "rating": 5, "guests": 2, "breakfast": true, "spa_access": true, "value_real": 2400}'::jsonb,
  'Atlas Luxury Collection'
),
(
  'L''Écrin d''Opale : Refuge de Verre sur la Lagune',
  'Bienvenue dans l''un des secrets les mieux gardés de la Sérénissime. Ce palais du XVIIIe siècle, restauré avec une audace contemporaine, semble flotter sur les eaux de Venise. Chaque fenêtre est un tableau vivant sur le Grand Canal. Votre chambre est parée de lustres en cristal de Murano soufflés à la bouche et de soieries Rubelli. L''exclusivité atteint son apogée lors de votre dîner privé sur le rooftop, où les lumières de la ville scintillent comme des diamants posés sur l''eau.',
  'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=2080&auto=format&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520939817794-3f5883ee2e95?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544161515-4af6b1d4b1f2?q=80&w=2000&auto=format&fit=crop'
  ],
  'Venise, Italie',
  600.00, 600.00, 1200.00, 2500.00,
  'active', 'auction',
  NOW(), NOW() + INTERVAL '10 days',
  '{"type": "hotel", "rating": 5, "guests": 2, "breakfast": true, "spa_access": false, "value_real": 3200}'::jsonb,
  'Venetian Heritage Hotels'
),
(
  'Vente Privée : Chalet Sommet Éternel - Ski-In/Ski-Out',
  'Accès direct aux pistes de Courchevel 1850 pour cette vente privée d''exception. Ce chalet de bois brûlé et de pierre brute est un sanctuaire de chaleur face à l''immensité blanche. Imaginez-vous rentrer skis aux pieds pour retrouver un feu de cheminée crépitant et un thé fumant préparé par votre chef privé. Le clou du spectacle : un bain à remous extérieur en cèdre, où vous contemplerez les étoiles après une journée intense sur le domaine des Trois Vallées.',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518731329158-bf2d436622fb?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548691905-57c36cc8d93f?q=80&w=2000&auto=format&fit=crop'
  ],
  'Courchevel, Alpes Françaises',
  0, 1450.00, 0, 1450.00,
  'active', 'fixed',
  NOW(), NOW() + INTERVAL '5 days',
  '{"type": "hotel", "rating": 5, "guests": 4, "breakfast": true, "spa_access": true, "value_real": 2900}'::jsonb,
  'Alpine Prestige Rentals'
),
(
  'Vente Privée : Secret des Cyclades - Villa à Débordement',
  'Loin des foules de Santorin, découvrez une île privée au cœur des Cyclades. Cette villa minimaliste, sculptée dans la roche, offre une vue à 360 degrés sur la Mer Égée. Ici, le bleu du ciel se confond avec celui de votre piscine à débordement de 20 mètres. Le design épuré laisse toute la place à la lumière naturelle et au souffle du vent. C’est l’endroit rêvé pour une déconnexion totale, un retour aux sources où seul le bruit des vagues rythme vos journées.',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop'
  ],
  'Île Privée, Grèce',
  0, 2100.00, 0, 2100.00,
  'active', 'fixed',
  NOW(), NOW() + INTERVAL '12 days',
  '{"type": "hotel", "rating": 5, "guests": 2, "breakfast": false, "spa_access": true, "value_real": 4500}'::jsonb,
  'Ionian Dream Villas'
);