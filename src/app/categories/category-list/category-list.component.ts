import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/category.model';
import { CategoriesService } from 'src/app/shared/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  subscription: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.categoriesService.categoriesChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data['result'];
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  onNewCategory() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
