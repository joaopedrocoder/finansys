import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResource } from '../models/base-resource.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseResourceService<T extends BaseResource> {
  protected http: HttpClient

  constructor(
    protected injector: Injector,
    protected baseUrl: string
  ) { 
    this.http = injector.get(HttpClient)
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    return this.http
      .post<T>(this.baseUrl, resource)
      .pipe(catchError(this.handleError));
  }

  update(resource: T): Observable<T> {
    return this.http.put(`${this.baseUrl}/${resource.id}`, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    const err = new Error('test');
    return throwError(() => err);
  }
}
