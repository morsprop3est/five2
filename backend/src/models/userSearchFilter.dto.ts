export interface UserSearchFilterDTO {
  id: number;
  user_id: string;
  brand_id?: number;
  model_id?: number;
  min_price?: number;
  max_price?: number;
  min_mileage?: number;
  max_mileage?: number;
  min_year?: number;
  max_year?: number;
  type_id?: number;
  gearbox_id?: number;
  fuel_id?: number;
  min_power?: number;
  max_power?: number;
  telegram: boolean;
} 