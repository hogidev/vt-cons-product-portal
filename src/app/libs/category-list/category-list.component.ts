import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Category } from '../product-add/category.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    private productService: ProductService,
    private route: Router
  ) {}

  ngOnInit() {
    this.categories$ = this.productService.getCategories();
  }

  deleteCategory(id: string) {
    if(confirm('Bạn có chắc chắn muốn xoá bản ghi?')) {
      this.productService.deleteCategory(id);
    }
  }

  editCategory(category: Category) {
    this.route.navigateByUrl('category', {
      state: {
        category
      }
    })
  }
}
