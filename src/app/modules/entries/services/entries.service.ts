import { CategoryService } from './../../categories/services/category.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

    // return this.http.post<Entry>(this.baseUrl, entry).pipe(catchError(this.handleError))
    return super.create(entry)
  }

  override update(entry: Entry): Observable<Entry> {
    if(entry.categoryId) {
      this.categoryService.getById(entry.categoryId).subscribe({
        next: response => entry.category = response,
        error: err => console.log(err)
      })
    }
    // return this.http.put<Entry>(`${this.baseUrl}/${entry?.id}`, entry).pipe(catchError(this.handleError))
    return super.update(entry)
  }
  
}
