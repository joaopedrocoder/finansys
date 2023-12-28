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
}
