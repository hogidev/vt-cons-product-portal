import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../product-add/category.interface';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  @ViewChild('file') fileInput!: ElementRef;
  formEditProduct!: FormGroup;
  categories$!: Observable<Category[]>;
  _location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.formEditProduct = this.fb.group({
      id: this.fb.control(''),
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
    const product = (this._location.getState() as any).product;
    if (product) {
      this.formEditProduct.patchValue(product);
    }
    this.categories$ = this.productService.getCategories();
  }

  submit() {
    if (this.formEditProduct.invalid) {
      return;
    }
    if (!this.formEditProduct.get('images')?.value) {
      alert('Vui lòng upload ảnh sản phẩm');
      return;
    }
    this.productService.updateProduct(this.formEditProduct.getRawValue());
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
    let images: any[] = this.formEditProduct.get('images')?.value || [];
    Object.keys(files)?.forEach((file, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        images.push(reader.result)
        this.formEditProduct.get('images')?.setValue(images);
      };
    });
  }

  deleteImage(index: number) {
    if (index > -1) {
      this.formEditProduct.get('images')?.value.splice(index, 1);
    }
  }
}
