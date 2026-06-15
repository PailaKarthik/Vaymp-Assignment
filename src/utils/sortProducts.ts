import type { SortOption } from "@/types/filter";
import type { Product } from "@/types/product";

/**
 * Sort products based on the specified sort option
 *
 * @param products - Array of products to sort
 * @param sortOption - Sort option type
 * @returns Sorted array of products
 *
 * Usage:
 * ```
 * const sorted = sortProducts(products, 'price-low-high');
 * ```
 */
export const sortProducts = (
  products: Product[],
  sortOption: SortOption,
): Product[] => {

  const sorted = [...products];

  switch (sortOption) {
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating-high-low":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);

    default:
      return sorted;
  }
};
