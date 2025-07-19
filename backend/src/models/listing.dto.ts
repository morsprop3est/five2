export interface ListingDTO {
  id: number;
  link: string;
  ad_name: string;
  brand_id: number;
  model_id: number;
  year: number;
  price: number;
  previous_price?: number;
  price_changed_at?: Date;
  mileage: number;
  power: number;
  type_id: number;
  gearbox_id: number;
  fuel_id: number;
  source_site_id: number;
  photo_url: string;
  parsed_at: Date;
  archived: boolean;
} 