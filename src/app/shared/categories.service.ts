import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories() {
    return this.http.get('/api/allCategories');
  }

  // Get category by id
  getCategory(id: string) {
    return this.http.get('/api/category?id=' + id);
  }

  // Add a new category
  addCategory(category: Category) {
    this.http
      .post('/api/add', {
        name: category.name,
        parent: category.parent,
      })
      .subscribe(
        (data) => {
          this.getData();
        },
        (error) => {
          console.error('Error: ', error);
          alert('Parent Category Id: ' + category.parent + ' not found!');
        }
      );
  }

  // Update a category
  updateCategory(id: string, updatedName: string) {
    return this.http
      .put('/api/update?category_id=' + id, {
        updatedName: updatedName,
      })
      .subscribe(
        (data) => {
          console.log('Data: ', data);
          this.getData();
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
  }

  // Remove a category
  removeCategory(id: string) {
    this.http.delete('/api/remove?category_id=' + id).subscribe(
      (data) => {
        this.getData();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  getData() {
    this.getCategories().subscribe(
      (data) => {
        this.categories = data['result'];
        this.categoriesChanged.next(this.categories.slice());
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
}
