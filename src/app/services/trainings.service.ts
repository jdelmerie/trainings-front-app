import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  constructor(private http:HttpClient) { }

  public getTrainings(){
    return this.http.get<Training[]>(environment.host+"/trainings");
  }
}
