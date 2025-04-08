export interface ICard {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
