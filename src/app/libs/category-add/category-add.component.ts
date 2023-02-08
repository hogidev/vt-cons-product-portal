import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      id: this.fb.control(new Date().getTime().toString()),
      code: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
    });
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    this.productService.addCategory(this.categoryForm.getRawValue());
    this.router.navigate(['products']);
  }
}
