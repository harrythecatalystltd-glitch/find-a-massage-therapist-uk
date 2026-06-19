export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      listing_treatment_types: {
        Row: {
          listing_id: string
          treatment_type_id: string
        }
        Insert: {
          listing_id: string
          treatment_type_id: string
        }
        Update: {
          listing_id?: string
          treatment_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_treatment_types_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_treatment_types_treatment_type_id_fkey"
            columns: ["treatment_type_id"]
            isOneToOne: false
            referencedRelation: "treatment_types"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          approved_at: string | null
          booking_url: string | null
          business_name: string
          cover_image_url: string | null
          created_at: string
          description_long: string | null
          dofollow: boolean
          email: string | null
          email_verified: boolean
          facebook: string | null
          fbclid: string | null
          id: string
          instagram: string | null
          is_featured: boolean
          lat: number | null
          lng: number | null
          logo_url: string | null
          owner_user_id: string | null
          pending_changes: Json | null
          phone: string | null
          postcode: string | null
          region: string | null
          slug: string | null
          source: string | null
          status: Database["public"]["Enums"]["listing_status"]
          summary: string | null
          tier: Database["public"]["Enums"]["listing_tier"]
          town: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          verification_token: string | null
          verified_at: string | null
          website_url: string | null
        }
        Insert: {
          approved_at?: string | null
          booking_url?: string | null
          business_name: string
          cover_image_url?: string | null
          created_at?: string
          description_long?: string | null
          dofollow?: boolean
          email?: string | null
          email_verified?: boolean
          facebook?: string | null
          fbclid?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean
          lat?: number | null
          lng?: number | null
          logo_url?: string | null
          owner_user_id?: string | null
          pending_changes?: Json | null
          phone?: string | null
          postcode?: string | null
          region?: string | null
          slug?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          summary?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"]
          town?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_token?: string | null
          verified_at?: string | null
          website_url?: string | null
        }
        Update: {
          approved_at?: string | null
          booking_url?: string | null
          business_name?: string
          cover_image_url?: string | null
          created_at?: string
          description_long?: string | null
          dofollow?: boolean
          email?: string | null
          email_verified?: boolean
          facebook?: string | null
          fbclid?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean
          lat?: number | null
          lng?: number | null
          logo_url?: string | null
          owner_user_id?: string | null
          pending_changes?: Json | null
          phone?: string | null
          postcode?: string | null
          region?: string | null
          slug?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          summary?: string | null
          tier?: Database["public"]["Enums"]["listing_tier"]
          town?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_token?: string | null
          verified_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          county: string | null
          created_at: string
          faqs: Json | null
          id: string
          intro_copy: string | null
          lat: number | null
          lng: number | null
          nearest_town_ids: string[] | null
          population: number | null
          region: string | null
          seo_body: string | null
          slug: string
          status: string
          town: string
        }
        Insert: {
          county?: string | null
          created_at?: string
          faqs?: Json | null
          id?: string
          intro_copy?: string | null
          lat?: number | null
          lng?: number | null
          nearest_town_ids?: string[] | null
          population?: number | null
          region?: string | null
          seo_body?: string | null
          slug: string
          status?: string
          town: string
        }
        Update: {
          county?: string | null
          created_at?: string
          faqs?: Json | null
          id?: string
          intro_copy?: string | null
          lat?: number | null
          lng?: number | null
          nearest_town_ids?: string[] | null
          population?: number | null
          region?: string | null
          seo_body?: string | null
          slug?: string
          status?: string
          town?: string
        }
        Relationships: []
      }
      massage_tools: {
        Row: {
          affiliate_url: string
          business_name: string
          created_at: string
          discount_percent: number | null
          id: string
          is_featured: boolean
          logo_url: string | null
          slug: string | null
          status: string
          summary: string | null
          tool_type: string | null
        }
        Insert: {
          affiliate_url: string
          business_name: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_featured?: boolean
          logo_url?: string | null
          slug?: string | null
          status?: string
          summary?: string | null
          tool_type?: string | null
        }
        Update: {
          affiliate_url?: string
          business_name?: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_featured?: boolean
          logo_url?: string | null
          slug?: string | null
          status?: string
          summary?: string | null
          tool_type?: string | null
        }
        Relationships: []
      }
      treatment_types: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      listing_status: "pending" | "verified" | "approved" | "rejected"
      listing_tier: "free" | "featured" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      listing_status: ["pending", "verified", "approved", "rejected"],
      listing_tier: ["free", "featured", "premium"],
    },
  },
} as const
