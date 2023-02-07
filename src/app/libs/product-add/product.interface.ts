export interface Product {
  id?: string;
  productName: string;
  productCode: string;
  productDescription?: string;
  discount?: number;
  price: number;
  descriptions?: string[];
}
