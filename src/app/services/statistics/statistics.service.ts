import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/statistics`;

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

  getStatistics(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/all`, this.getHttpOptions());
  }

  getStudentsPerGroup(): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/students-per-group`,
      this.getHttpOptions()
    );
  }

  getStudentsPerYear(): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/students-per-year`,
      this.getHttpOptions()
    );
  }
}
