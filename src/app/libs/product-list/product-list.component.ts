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
  productCategories!: Array<ProductCategory>;
  lstFilterCategory: Category[] = [];
  ids: string[] = [];
  isNoProduct = false;

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
      if (categories && products && categories.length && products.length)
      this.categories = categories;
      this.productCategories = categories.map(category => {
        return {
          ...category,
          products: products.filter(i => category.code === i.categoryCode)
        }
      });
      this.isNoProduct = !this.productCategories.some(item => item.products.length > 0);
    });
  }

  resetInputSearch() {
    this.searchForm.reset();
    this.showSearchTxt = this.searchForm.get('searchText')?.value;
    this.getProduct();
  }

  submitSearchForm() {
    this.showSearchTxt = this.searchForm.get('searchText')?.value;
    this.getProduct();
  }

  addProduct() {
    this.router.navigate(['add'])
  }

  selectTypeView(type: viewType) {
    this.typeView = type;
  }

  getProduct() {
    this.productService.getProducts().subscribe((products) => {
      if (products && products.length) {
        if (this.searchForm.get('searchText')?.value) {
          const filter = this.searchForm.get('searchText')?.value;
          products = products.filter(item => item.productCode.includes(filter) || item.productName.includes(filter));
        }
        const filterCategories = this.lstFilterCategory.length ? this.lstFilterCategory : this.categories;
        this.productCategories = filterCategories.map(category => {
          return {
            ...category,
            products: products.filter(i => category.code === i.categoryCode)
          }
        });
        this.isNoProduct = !this.productCategories.some(item => item.products.length > 0);
      }
    });
  }

  deleteProduct(id: string) {
    if(confirm('Bạn có chắc chắn muốn xoá bản ghi?')) {
      this.productService.deleteProduct(id)
    }
  }

  editProduct(product: Product) {
    this.router.navigateByUrl('edit', {
      state: {
        product
      }
    });
  }

  filterCategoryChange(event: any) {
    if (event.target.checked && this.ids.indexOf(event.target.value) === -1) {
      this.ids.push(event.target.value);
    }
    if (!event.target.checked) {
      const index = this.ids.indexOf(event.target.value);
      this.ids.splice(index, 1);
    }
    this.lstFilterCategory = this.categories.filter(i => this.ids.includes(i.id));
    this.getProduct();
  }
}
