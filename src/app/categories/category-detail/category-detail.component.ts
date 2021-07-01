import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from 'src/app/category.model';
import { CategoriesService } from 'src/app/shared/categories.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category: Category;
  id: string;
  parentCategory: Category;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.categoriesService.getCategory(this.id).subscribe(
        (data) => {
          this.category = data['result'][0];
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
    });
  }

  onEditCategory() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteCategory(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.categoriesService.removeCategory(id);
      this.router.navigate(['../']);
    }
  }
}
