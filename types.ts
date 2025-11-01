
export enum Category {
  Entrees = "Entrées",
  Pates = "Pâtes",
  Desserts = "Desserts",
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export enum OrderType {
  Takeout = "À emporter",
  Delivery = "Livraison",
}

export enum View {
  Menu = 'menu',
  Cart = 'cart',
  Confirmation = 'confirmation'
}
