import { Component, Injector } from '@angular/core';

import { Validators } from '@angular/forms';

import { CategoryService } from './../services/category.service';
import { Category } from '../models/category.model';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(
    protected categoryService: CategoryService,
    protected override injector: Injector,
  ) {
    super(injector, new Category(), categoryService)
  }

  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Nova Categoria'
  }

  protected override editionPageTitle(): string {
    const categoryName = this.resource.name ?? ''
    return 'Editando Categoria: ' + categoryName
  }
}
