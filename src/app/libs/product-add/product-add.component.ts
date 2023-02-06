import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      productName: this.fb.control(''),
      productCode: this.fb.control(''),
      productDescription: this.fb.control('')
    })
  }
}
