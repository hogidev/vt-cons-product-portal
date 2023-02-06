import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type viewType = 'grid' | 'list';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  searchForm!: FormGroup;
  typeView: viewType = 'grid';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchText: this.fb.control('')
    })
  }

  resetInputSearch() {
    this.searchForm.reset();
  }

  submitSearchForm() {
    console.log('Searching....')
  }

  addProduct() {
    this.router.navigate(['add'])
  }

  selectTypeView(type: viewType) {
    this.typeView = type;
  }
}
