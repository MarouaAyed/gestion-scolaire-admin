import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Parent } from '../../models/parent/parent.model';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/parents`;
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

  getParents() {
    return this.httpClient.get<any>(`${this.apiUrl}`, this.getHttpOptions());
  }

  addParent(parentData: Parent, imageFile: File | null): Observable<any> {
    const formData = new FormData();

    // Append the form data
    for (const key in parentData) {
      if (parentData[key] !== undefined) {
        formData.append(key, parentData[key]);
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

    return this.httpClient.post(`${this.apiUrl}`, formData, httpOptions);
  }

  updateParent(parent: Parent): Observable<Parent> {
    var headers_object = new HttpHeaders({
      // No need to set 'Content-Type' to 'application/json' because FormData handles it
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<Parent>(
      `${this.apiUrl}/${parent.id}`,
      parent,
      httpOptions
    );
  }

  deleteParent(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getHttpOptions()
    );
  }
}
