import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  
  constructor(private categoryService: CategoryService) {} 

  ngOnInit(): void {
    this.listCategories()
  }

  listCategories() {
    this.categoryService.getAll().subscribe({
      next: response => console.log(response),
      error: err => console.log(err) 
    })
  }

  deleteCategory(id: number): void {
    console.log(id)
  }
}
