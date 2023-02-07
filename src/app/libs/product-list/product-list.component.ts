import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../product-add/product.interface';
import { Observable } from 'rxjs';

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
  }

  resetInputSearch() {
    this.searchForm.reset();
    this.products$ = this.productService.getProducts();
  }

  submitSearchForm() {
    if (this.searchForm.get('searchText')?.value) {
      this.products$ = this.productService.getProducts(this.searchForm.get('searchText')?.value);
    } else {
      this.products$ = this.productService.getProducts();
    }
  }

  addProduct() {
    this.router.navigate(['add'])
  }

  selectTypeView(type: viewType) {
    this.typeView = type;
  }
}
