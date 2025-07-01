export type Product = {
  id: string;
  name: string;
  sku: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  product_cost: number;
  currency: {
    id: number;
    code: string;
    symbol: string;
  };
  stock_quantity: number;
  low_stock_alert: number;
  stock_method: string;
  stock_status: string;
  profit_margin: number;
  total_stock: number;
  is_featured: boolean;
  has_special_deals: boolean;
  review_count: number;
  average_rating: number | null;
  primary_image_url: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
