import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product-add/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') ?? '' ;
        return this.productService.getProductById(id);
      })
    ).subscribe((res) => {
      if (res && res.length) {
        this.product = {
          ...res[0],
          descriptions: res[0].productDescription?.split('\n')
        };
      }
    })
  }
}
