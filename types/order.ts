export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type OrderPriority = "low" | "medium" | "high";

export interface OrderItem {
  id: number;
  product: string;
  product_name: string;
  variety: string;
  variety_name: string;
  quantity: number;
  price: string;
  total_price: string;
}

export interface PerformedBy {
  name: string;
  email: string;
  gender: string | null;
  phone_number: string | null;
  url: string;
}

export interface AuditLog {
  id: number;
  action: string;
  details: {
    source: string;
  };
  performed_by: PerformedBy;
  ip_address: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order: number;
  order_number: string;
  customer_name: string;
  total_amount: string;
  status: OrderStatus;
  assigned_to: string | null;
  assigned_to_details: any | null; // Define this more strictly if you know the structure
  priority: OrderPriority;
  notes: string;
  estimated_delivery_date: string;
  actual_delivery_date: string | null;
  is_flagged: boolean;
  flag_reason: string;
  items: OrderItem[];
  audit_logs: AuditLog[];
  created_at: string;
  updated_at: string;
}
