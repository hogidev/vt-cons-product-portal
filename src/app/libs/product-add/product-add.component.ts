import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category } from './category.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  formNewProduct!: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.formNewProduct = this.fb.group({
      productName: this.fb.control('', [Validators.required]),
      productCode: this.fb.control('', [Validators.required]),
      productDescription: this.fb.control(''),
      discount: this.fb.control(0),
      price: this.fb.control(null, [Validators.required]),
      categoryCode: this.fb.control(null, [Validators.required])
    })
  }

  ngOnInit() {
    this.categories$ = this.productService.getCategories();
  }

  submit() {
    if (this.formNewProduct.valid) {
      this.productService.addProduct({
        id: new Date().getTime().toString(),
        ...this.formNewProduct.getRawValue()
      });
      this.router.navigate(['products']);
    }
  }
}
