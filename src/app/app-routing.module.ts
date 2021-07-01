import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      { path: 'new', component: CategoryEditComponent },
      {
        path: ':id',
        component: CategoryDetailComponent,
      },
      {
        path: ':id/edit',
        component: CategoryEditComponent,
      },
    ],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})

export class AppRoutingModule {}
