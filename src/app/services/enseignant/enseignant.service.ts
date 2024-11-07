import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enseignant } from '../../models/enseignant/enseignant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/enseignants`;
  token: any;

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  getEnseignants() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<any>(`${this.apiUrl}`, httpOptions);
  }

  addEnseignant(enseignantData: Enseignant, imageFile: File | null): Observable<any> {
    const formData = new FormData();

    // Append the form data
    for (const key in enseignantData) {
      if (enseignantData[key] !== undefined) {
        formData.append(key, enseignantData[key]);
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
}
