import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('file') fileInput!: ElementRef;
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
      categoryCode: this.fb.control(null, [Validators.required]),
      images: this.fb.control(null)
    })
  }

  ngOnInit() {
    this.categories$ = this.productService.getCategories();
  }

  submit() {
    if (this.formNewProduct.invalid) {
      return;
    }
    if (!this.formNewProduct.get('images')?.value) {
      alert('Vui lòng upload ảnh sản phẩm');
      return;
    }
    this.productService.addProduct({
      id: new Date().getTime().toString(),
      ...this.formNewProduct.getRawValue()
    });
    this.fileInput.nativeElement.value = null;
    this.router.navigate(['products']);
  }

  onChooseFile(files: File[]) {
    Object.keys(files)?.forEach((file, i) => {
      if (files[i].size > 1024000) {
        alert(`File ${files[i].name} vượt quá 1Mb, tải lại file mới`);
        this.fileInput.nativeElement.value = null;
        return;
      }
    });
    let images: any[] = [];
    Object.keys(files)?.forEach((file, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        images.push(reader.result)
      };
    });
    this.formNewProduct.get('images')?.setValue(images);
  }
}
