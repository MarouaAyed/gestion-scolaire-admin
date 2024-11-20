import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Eleve } from '../../models/eleve/eleve.model';

@Injectable({
  providedIn: 'root',
})
export class EleveService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/eleves`;
  token: any;

  constructor(private httpClient: HttpClient) {}

  // Getter for httpOptions to be used in all API calls
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  getEleves() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(`${this.apiUrl}`, httpOptions);
  }

  addEleve(eleveData: Eleve, imageFile: File | null): Observable<any> {
    const formData = new FormData();

    // Append the form data
    for (const key in eleveData) {
      if (eleveData[key] !== undefined) {
        formData.append(key, eleveData[key]);
      }
    }

    // Append the image file if it exists
    if (imageFile) {
      formData.append('image', imageFile);
    }

    var headers_object = new HttpHeaders({
      // No need to set 'Content-Type' to 'application/json' because FormData handles it
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post(
      `${this.apiUrl}`,
      formData,
      httpOptions
    );
  }

  updateEleve(eleve: Eleve): Observable<Eleve> {
    return this.httpClient.put<Eleve>(
      `${this.apiUrl}/${eleve.id}`,
      eleve,
      this.getHttpOptions()
    );
  }

  deleteEleve(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getHttpOptions()
    );
  }
}
