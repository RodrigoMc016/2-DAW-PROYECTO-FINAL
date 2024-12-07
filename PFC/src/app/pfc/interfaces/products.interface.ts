export interface Product {
  id:number;
  name:string;
  description: string;
  price_real: number;
  price_points: number;
  discounted_price?:number;
  category?:string;
  image_url: string;
  sauce?: string;
  cookingPoint?:string;

}
