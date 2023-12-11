import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'api/categories'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.baseUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategories)
    )
  }

  getById(id: number): Observable<Category>{
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.baseUrl, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    )
  }

  update(category: Category, id: number): Observable<Category> {
    return this.http.post(`${this.baseUrl}/${id}`, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataCategories(jsonData: any[]): Category[] {
    const categories: Category[] = []
    jsonData.forEach(element => categories.push(element as Category))
    
    return categories
  }

  private jsonDataCategory(jsonData: any): Category {
    return jsonData as Category
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error)
    const err = new Error('test') 
    return throwError(() => err)
  }
}
