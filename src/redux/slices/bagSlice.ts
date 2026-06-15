import type { BagItem, BagState } from "@/types/bag";
import type { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Initial State
 */
const initialState: BagState = {
  items: [],
  totalItems: 0,
  grandTotal: 0,
};

/**
 * Helper: Calculate totals from items
 */
const calculateTotals = (items: BagItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return { totalItems, grandTotal };
};

/**
 * Bag Slice
 * Manages shopping bag state - persisted to AsyncStorage
 */
export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    /**
     * Add product to bag
     * If product already exists, increase quantity instead
     */
    addToBag: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }

      const { totalItems, grandTotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.grandTotal = grandTotal;
    },

    /**
     * Remove product from bag completely
     */
    removeFromBag: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );

      const { totalItems, grandTotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.grandTotal = grandTotal;
    },

    /**
     * Increase quantity of product in bag by 1
     */
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }

      const { totalItems, grandTotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.grandTotal = grandTotal;
    },

    /**
     * Decrease quantity of product in bag by 1
     * Remove product if quantity reaches 0
     */
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload,
          );
        }
      }

      const { totalItems, grandTotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.grandTotal = grandTotal;
    },
  },
});

export const {
  addToBag,
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
} = bagSlice.actions;

export default bagSlice.reducer;
