import type { Product } from "@/types/product";

/**
 * Filter products by category
 *
 * @param products - Array of products to filter
 * @param category - Category to filter by
 * @returns Filtered array of products
 *
 * Usage:
 * ```
 * const filtered = filterProducts(products, 'electronics');
 * ```
 */
export const filterProducts = (
  products: Product[],
  category: string | null,
): Product[] => {
  if (!category) {
    return products;
  }

  return products.filter((product: Product) => product.category === category);
};
