import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent extends BaseResourceListComponent<Category>{
  
  constructor(
    private categoryService: CategoryService
  ) {
    super(categoryService)
  }

  // listCategories() {
  //   this.categoryService.getAll().subscribe({
  //     next: (response) => (this.categories = response),
  //     error: (err) => console.log(err),
  //   });
  // }

  // deleteCategory(id?: number): void {
  //   const mustDelete = confirm('Deseja realmente excluir este item?');

  //   if (mustDelete && id)
  //     this.categoryService.delete(id).subscribe({
  //       next: (response) =>
  //         (this.categories = this.categories.filter(
  //           (category) => category.id !== id
  //         )),
  //       error: (err) => console.log(err),
  //     });
  // }
  
}
