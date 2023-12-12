import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: Category[] = []
  constructor(private categoryService: CategoryService) {} 

  ngOnInit(): void {
    this.listCategories()
  }

  listCategories() {
    this.categoryService.getAll().subscribe({
      next: response => this.categories = response,
      error: err => console.log(err) 
    })
  }

  deleteCategory(id: number): void {
    const mustDelete = confirm('Deseja realmente excluir este item?')

    if(mustDelete)
    this.categoryService.delete(id).
      subscribe({
        next: response => this.categories = this.categories.filter(category => category.id !== id),
        error: err => console.log(err)
      })
  }
}
