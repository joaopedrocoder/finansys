import { CategoryService } from './../../categories/services/category.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private baseUrl = 'api/entries'
  
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.baseUrl)
  }

  getById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError))
  }

  create(entry: Entry): Observable<Entry> {
    if(entry.categoryId) {
      this.categoryService.getById(entry.categoryId).subscribe({
        next: response => entry.category = response,
        error: err => console.log(err)
      })
    }

    return this.http.post<Entry>(this.baseUrl, entry).pipe(catchError(this.handleError))
  }

  update(entry: Entry): Observable<Entry> {
    if(entry.categoryId) {
      this.categoryService.getById(entry.categoryId).subscribe({
        next: response => entry.category = response,
        error: err => console.log(err)
      })
    }

    console.log(entry)
    return this.http.put<Entry>(`${this.baseUrl}/${entry?.id}`, entry).pipe(catchError(this.handleError))
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError))
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    const err = new Error('test');
    return throwError(() => err);
  }
  
}