import type { Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Product Slice State
 */
interface ProductSliceState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/**
 * Initial State
 */
const initialState: ProductSliceState = {
  products: [],
  loading: false,
  error: null,
};

/**
 * Async Thunk: Fetch Products
 * Fetches products from FakeStoreAPI via productsApi
 */
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return rejectWithValue(message);
    }
  },
);

/**
 * Product Slice
 */
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.products = [];
      });
  },
});

export default productSlice.reducer;
