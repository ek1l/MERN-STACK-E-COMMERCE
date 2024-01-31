import { CartItem, ShippingInfo, User } from './types';

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface CartReducerInitialState {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  loading: boolean;
  shippingInfo: ShippingInfo;
}
