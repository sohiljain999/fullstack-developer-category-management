import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../category.model';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  status = 'DOWN';
  categories: Category[] = [];
  title = 'Fashion Category App';

  constructor(
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.statusService.getStatus().subscribe(
      (data) => {
        this.status = data['status'];
        console.log('Backend Server Status: ', this.status);
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }

  createCategory() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
