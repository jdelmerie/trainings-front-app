import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getCategories() {
    return this.http.get<Category[]>(environment.host + '/categories');
  }

  public getOneCategory(id: number) {
    return this.http.get<Category>(environment.host + '/category/' + id);
  }
}
