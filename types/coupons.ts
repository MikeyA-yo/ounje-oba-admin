export interface Coupon {
  id: string;
  name: string;
  description: string;
  discount_type: "fixed" | "percentage";
  discount_type_display: string;
  discount_value: number;
  priority: number;
  priority_display: string;
  min_purchase: number;
  max_discount: number | null;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
  code: string;
  usage_limit: number;
  usage_count: number;
  is_single_use: boolean;
  allowed_products: string[];
  allowed_categories: string[];
}
