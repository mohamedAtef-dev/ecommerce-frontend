import { createSlice } from '@reduxjs/toolkit';
// 1. استيراد PayloadAction كنوع فقط (Type-only import) لحل مشكلة verbatimModuleSyntax
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductImage {
  id?: number;
  url: string;
}

export interface Product {
  id: number | string;
  productTitle: string;
  productPrice: number;
  productImg?: ProductImage[]; // 2. استبدال any بالنوع الصحيح والمحدد لتجنب خطأ Unexpected any
  productDescription?: string;
  productRating?: number;
}

interface CartState {
  cartProducts: Product[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

      if (!existingProduct) {
        state.cartProducts.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions; // ملاحظة: تأكد من كتابة export الصحيحة للـ actions
export default cartSlice.reducer;