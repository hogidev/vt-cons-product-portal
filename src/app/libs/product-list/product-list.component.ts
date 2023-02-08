import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../product-add/product.interface';
import { combineLatest, Observable } from 'rxjs';
import { Category } from '../product-add/category.interface';

type viewType = 'grid' | 'list';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  searchForm!: FormGroup;
  typeView: viewType = 'grid';
  products$!: Observable<Product[]>;
  showSearchTxt = '';
  categories!: Category[];
  products!: Array<ProductCategory>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.searchForm = this.fb.group({
      searchText: this.fb.control('')
    })
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    combineLatest([
      this.productService.getProducts(),
      this.productService.getCategories()
    ]).subscribe(([products, categories]) => {
      this.categories = categories;
      if (products && products.length) {
        const res = products.reduce((acc: {[key: string]: any} = {}, curr) => (
          (acc[curr.categoryCode] = acc[curr.categoryCode] || []).push(curr), acc
        ), {});
        this.products = Object.keys(res).map(key => ({key: categories.find(item => item.code === key)?.name || '', products: res[key]}));
      }
    });
  }

  resetInputSearch() {
    this.searchForm.reset();
    this.showSearchTxt = this.searchForm.get('searchText')?.value;
    this.getProduct();
  }

  submitSearchForm() {
    this.showSearchTxt = this.searchForm.get('searchText')?.value;
    if (this.searchForm.get('searchText')?.value) {
      this.getProduct(this.searchForm.get('searchText')?.value);
      // this.products$ = this.productService.getProducts(this.searchForm.get('searchText')?.value);
    } else {
      this.getProduct();
      // this.products$ = this.productService.getProducts();
    }
  }

  addProduct() {
    this.router.navigate(['add'])
  }

  selectTypeView(type: viewType) {
    this.typeView = type;
  }

  getProduct(filter?: string) {
    this.productService.getProducts(filter).subscribe((products) => {
      if (products && products.length) {
        const res = products.reduce((acc: {[key: string]: any} = {}, curr) => (
          (acc[curr.categoryCode] = acc[curr.categoryCode] || []).push(curr), acc
        ), {});
        this.products = Object.keys(res).map(key => ({key: this.categories.find(item => item.code === key)?.name || '', products: res[key]}));
      }
    });
  }
}
