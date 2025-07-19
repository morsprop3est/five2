export interface NotificationQueueDTO {
  id: number;
  user_id: string;
  listing_id: number;
  type: string; // "new" | "price_drop"
  created_at: Date;
  sent: boolean;
} 