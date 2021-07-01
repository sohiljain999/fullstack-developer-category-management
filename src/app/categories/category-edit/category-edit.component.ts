import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  id: string;
  editMode = false;
  categoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let categoryName = '';
    let parentId = '';

    if (this.editMode) {
      const category = this.categoriesService
        .getCategory(this.id)
        .subscribe((data) => {});
      categoryName = category['name'];
    }
    this.categoryForm = new FormGroup({
      name: new FormControl(categoryName, Validators.required),
      parent: new FormControl(parentId),
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.categoriesService.updateCategory(
        this.id,
        this.categoryForm.value.name
      );
    } else {
      this.categoriesService.addCategory(this.categoryForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
