import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
export class CategoryAddComponent implements OnInit {
  categoryForm!: FormGroup;
  _location = inject(Location);
  isEdit = false;

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

  ngOnInit() {
    const category = (this._location.getState() as any).category;
    if (category) {
      this.categoryForm.patchValue(category);
      this.isEdit = true;
    }
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.isEdit) {
      this.productService.updateCategory(this.categoryForm.getRawValue());
    } else {
      this.productService.addCategory(this.categoryForm.getRawValue());
    }
    this.router.navigate(['categories']);
  }
}
