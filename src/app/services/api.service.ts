import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { Order } from '../model/order';
import { Training } from '../model/training';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //get all trainings from api
  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  //get training by id
  public getOneTraining(id: number) {
    return this.http.get<Training>(environment.host + '/training/' + id);
  }

  //add one training
  public add(training: Training) {
    return this.http.post<Training>(environment.host + '/trainings', training);
  }

  //delete
  public deleteTr(id: number) {
    return this.http.delete<Training>(environment.host + '/trainings/' + id);
  }

  public update(training: Training) {
    return this.http.put<Training>(
      environment.host + '/training/' + training.id,
      training
    );
  }

  public getByCategories(id: number) {
    return this.http.get<Training[]>(
      environment.host + '/categorie/' + id + '/trainings'
    );
  }

  public addOrder(order: Order) {
    return this.http.post<Order>(environment.host + '/order', order);
  }

  public getCategories() {
    return this.http.get<Category[]>(environment.host + '/categories');
  }

  public getOneCategory(id: number) {
    return this.http.get<Category>(environment.host + '/category/' + id);
  }
}
