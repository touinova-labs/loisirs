// types/index.ts

export interface AuctionAttributes {
  booking_info: string;
  validity_months: number;
  lng: number;
  lat: number;
  reviews_count: number;
  rating: number;
  type?: 'hotel' | 'restoration' | 'sport' | 'wellness';
  guests?: number;
  duration?: string;
  breakfast?: boolean;
  spa_access?: boolean;
  menu?: string;
  value_real?: number; // Pour afficher "Valeur réelle : 120€"
  is_private?: boolean; // Indique si l'expérience est privée (uniquement pour les expériences)
  has_delivery: boolean; // Indique si //  la livraison est disponible
  
}

export interface Auction {
  id: string;
  title: string;
  description?: string;
  main_image?: string;
  images: string[];
  start_price: number;
  current_price: number;
  reserve_price: number;
  end_at: string; // Format ISO string de la DB
  start_at: string; // Format ISO string de la DB
  created_at: string;
  user_id: string; // Le créateur de l'enchère
  is_limited: boolean; // Indique si l'enchère est limitée
  type: 'auction' | 'fixed' | 'hybrid'; // Type d'enchère
  buy_now_price?: number; // Prix pour l'achat immédiat (optionnel)
  attributes: AuctionAttributes; // Attributs spécifiques à l'enchère
  location_name: string; // Lieu de l'enchère (optionnel)
  status: AuctionStatus
  partner_name: string
  booking_url: string
  partner_email: string
  total_bids : number
  enabled: boolean
}


export type AuctionStatus =
  | 'upcoming'
  | 'active'
  | 'finished_reserve_not_met'
  | 'finished_unpaid'
  | 'finished_paid'
  | 'completed';

export interface AdminAuction {
  id: string;
  title: string;
  status: AuctionStatus;
  current_price: number;
  reserve_price: number;
  end_at: string;
  start_at: string;
  total_bids: number;
  winner_email?: string;
  winner_name?: string;
}

export interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
}

export const STATUS_LABELS = {
  upcoming: { label: 'À venir', color: 'bg-blue-100 text-blue-800' },
  active: { label: 'En cours', color: 'bg-emerald-100 text-emerald-800' },
  finished_reserve_not_met: { label: 'Fini - sans vainqueur', color: 'bg-amber-100 text-amber-800' },
  finished_unpaid: { label: 'Fini - Attente paiement', color: 'bg-amber-100 text-amber-800' },
  finished_paid: { label: 'Fini - Payé', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'Prestation terminée', color: 'bg-gray-100 text-gray-800' },
};

