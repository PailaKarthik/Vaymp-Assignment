import type { Product } from "./product";

export interface BagItem {
  product: Product;
  quantity: number;
}

export interface BagState {
  items: BagItem[];
  totalItems: number;
  grandTotal: number;
}
