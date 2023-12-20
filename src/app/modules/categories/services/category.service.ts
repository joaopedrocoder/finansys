import { Injectable, Injector } from '@angular/core';
import { Category } from '../models/category.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseResourceService<Category> {
  protected url = 'api/categories';

  constructor(protected override injector: Injector) {
    super(injector, 'api/categories');
  }
}
