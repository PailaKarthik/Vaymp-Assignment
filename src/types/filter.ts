export type SortOption =
  | "price-low-high"
  | "price-high-low"
  | "rating-high-low";

export interface FilterState {
  selectedCategory: string | null;
}
