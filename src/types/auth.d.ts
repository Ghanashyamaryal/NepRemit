// Supabase Auth types are provided by @supabase/supabase-js
// This file is kept for any custom auth type extensions

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image: string | null;
  phone: string | null;
  country: string;
  default_currency: string;
  notifications_rate_alerts: boolean;
  notifications_weekly_digest: boolean;
  notifications_promotions: boolean;
  notifications_product_updates: boolean;
  created_at: string;
  updated_at: string;
}
