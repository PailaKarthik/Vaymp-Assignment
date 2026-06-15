import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '@/types/filter';

/**
 * Initial State
 */
const initialState: FilterState = {
  selectedCategory: null,
};

/**
 * Filter Slice
 * Manages product filtering - only category filter
 */
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /**
     * Set selected category for filtering
     */
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    /**
     * Clear category filter - show all products
     */
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, clearCategory } = filterSlice.actions;

export default filterSlice.reducer;
