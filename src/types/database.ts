export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          image?: string | null;
          phone?: string | null;
          country?: string;
          default_currency?: string;
          notifications_rate_alerts?: boolean;
          notifications_weekly_digest?: boolean;
          notifications_promotions?: boolean;
          notifications_product_updates?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          image?: string | null;
          phone?: string | null;
          country?: string;
          default_currency?: string;
          notifications_rate_alerts?: boolean;
          notifications_weekly_digest?: boolean;
          notifications_promotions?: boolean;
          notifications_product_updates?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      rate_alerts: {
        Row: {
          id: string;
          user_id: string;
          currency_pair: string;
          base_currency: string;
          target_currency: string;
          target_rate: number;
          direction: string;
          is_active: boolean;
          triggered_at: string | null;
          last_notified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          currency_pair: string;
          base_currency: string;
          target_currency?: string;
          target_rate: number;
          direction: string;
          is_active?: boolean;
          triggered_at?: string | null;
          last_notified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          currency_pair?: string;
          base_currency?: string;
          target_currency?: string;
          target_rate?: number;
          direction?: string;
          is_active?: boolean;
          triggered_at?: string | null;
          last_notified_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rate_alerts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
