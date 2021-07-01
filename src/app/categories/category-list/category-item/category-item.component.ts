import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/category.model';
import { CategoriesService } from 'src/app/shared/categories.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Input() index: number;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {}

  delete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.categoriesService.removeCategory(id);
    }
  }
}
