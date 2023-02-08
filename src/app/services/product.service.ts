import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import { Product } from '../libs/product-add/product.interface';
import { Observable } from 'rxjs';
import { Category } from '../libs/product-add/category.interface';

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

  updateProduct(product: Product) {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', product.id));
  }

  getProducts() {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef);
    return collectionData(q) as unknown as Observable<Product[]>;
  }

  getCategories() {
    const categoriesRef = collection(this.firestore, 'categories');
    let c = query(categoriesRef);
    return collectionData(c) as unknown as Observable<Category[]>;
  }

  getProductById(id: string) {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', id));
    return collectionData(q) as unknown as Observable<Product[]>;
  }

  async deleteProduct(id: string) {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'products', document.id);
      await deleteDoc(docRef);
    })

  }
}
