import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Product } from '../libs/product-add/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private firestore: Firestore
  ) {}

  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  getProducts(filter = '') {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef);
    if (filter) {
      q = query(productRef, where('productName', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Product[]>;
  }
}
