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
  quantity?: number;
}

interface CartState {
  cartProducts: Product[];
}

const storedCart = localStorage.getItem("cartProducts");

const initialState: CartState = {
  cartProducts: storedCart ? JSON.parse(storedCart) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );

if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    },
    // Remove Product Function
    removeFromCart: (state, action: PayloadAction<{id: number | string}>) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    },
    // IncreaseQuantity Product Function
    increaseQuantity: (state, action: PayloadAction<{id: number | string}>) => {
      const product = state.cartProducts.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = (product.quantity || 1) + 1;
        localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
      }
    },
    // decreaseQuantity Product Function
        decreaseQuantity: (state, action: PayloadAction<{id: number | string}>) => {
      const product = state.cartProducts.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = (product.quantity || 1) - 1;
        localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;