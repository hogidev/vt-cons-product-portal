import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './libs/product-list/product-list.component';
import { ProductAddComponent } from './libs/product-add/product-add.component';
import { ProductDetailComponent } from './libs/product-detail/product-detail.component';
import { CategoryAddComponent } from './libs/category-add/category-add.component';
import { ProductEditComponent } from './libs/product-edit/product-edit.component';
import { CategoryListComponent } from './libs/category-list/category-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: ProductAddComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'edit',
    component: ProductEditComponent
  },
  {
    path: 'category',
    component: CategoryAddComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
