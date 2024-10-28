import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recette } from '../../models/recette/recette.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(private httpClient: HttpClient) {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }


  getRecettes(){
    console.log(this.token);
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+ localStorage.getItem('token')
      });
  
          const httpOptions = {
            headers: headers_object
          };
      return this.httpClient.get<any>(`${this.apiUrl}/recettes`,httpOptions);
    }

    insertRecette(recette: Recette): Observable<Recette> {
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+ localStorage.getItem('token')
      });
      const httpOptions = {
        headers: headers_object
      };
      return this.httpClient.post<Recette>(`${this.apiUrl}/addRecette`, recette, httpOptions);
    }

    updateRecette(id: any, data: Recette): Observable<Recette> {
      const headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      });
  
      const httpOptions = {
        headers: headers_object
      };
      return this.httpClient.put<Recette>(`${this.apiUrl}/updateRecette/${id}`, data, httpOptions);
    }


    deleteRecette(id: any): Observable<any> {
      const headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      });
  
      const httpOptions = {
        headers: headers_object
      };
      return this.httpClient.delete<any>(`${this.apiUrl}/deleteRecette/${id}`, httpOptions);
    }

    getEcoles(){
      console.log(this.token);
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+ localStorage.getItem('token')
      });
    
          const httpOptions = {
            headers: headers_object
          };
      return this.httpClient.get<any>(`${this.apiUrl}/ecoles`,httpOptions);
    }

    getRecetteById(id: any): Observable<any> {
      const headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      });
  
      const httpOptions = {
        headers: headers_object
      };
      return this.httpClient.get<Recette>(`${this.apiUrl}/recette/${id}`, httpOptions);
    }

}
