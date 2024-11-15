import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(private http: HttpClient) {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  login(email: string, password: string): Observable<any> {
    const data = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, data);
  }
}

