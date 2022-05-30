import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Training } from '../model/training';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  //get all trainings from api
  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  //get training by id
  public getOneTraining(training: Training) {
    return this.http.get<Training>(
      environment.host + '/trainings/' + training.id
    );
  }

  //add one training
  public add(training: Training) {
    return this.http.post<Training>(
      environment.host + '/trainings',
      training,
      this.httpOptions
    );
  }

  //delete
  public deleteTr(training: Training) {
    return this.http.delete<Training>(
      environment.host + '/trainings/' + training.id
    );
  }

  public update(training: Training) {
    return this.http.put<Training>(
      environment.host + '/trainings/' + training.id,
      training,
      this.httpOptions
    );
  }
}
