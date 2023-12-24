import { CategoryService } from './../../categories/services/category.service';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Entry } from '../models/entry.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends BaseResourceService<Entry> {
  protected url = 'api/entries'
  
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, 'api/entries');
  }

  override create(entry: Entry): Observable<Entry> {
    if(entry.categoryId) {
      this.categoryService.getById(entry.categoryId).subscribe({
        next: response => entry.category = response,
        error: err => console.log(err)
      })
    }

    return super.create(entry)
  }

  override update(entry: Entry): Observable<Entry> {
    if(entry.categoryId) {
      this.categoryService.getById(entry.categoryId).subscribe({
        next: response => entry.category = response,
        error: err => console.log(err)
      })
    }
    
    return super.update(entry)
  }
  
}
