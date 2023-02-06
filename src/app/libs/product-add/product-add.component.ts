import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  formNewProduct!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.formNewProduct = this.fb.group({
      productName: this.fb.control('', [Validators.required]),
      productCode: this.fb.control('', [Validators.required]),
      productDescription: this.fb.control(''),
      discount: this.fb.control(null),
      price: this.fb.control(0, [Validators.required])
    })
  }

  submit() {
    console.log(this.formNewProduct.value)
  }
}
