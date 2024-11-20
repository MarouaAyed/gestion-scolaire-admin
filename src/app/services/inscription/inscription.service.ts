import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inscription } from '../../models/inscription/inscription.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/inscriptions`;

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

  getInscriptions(): Observable<Inscription[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<Inscription[]>(this.apiUrl, httpOptions);
  }

  getInscription(id: number): Observable<Inscription> {
    return this.httpClient.get<Inscription>(`${this.apiUrl}/${id}`);
  }

  createInscription(inscription: Inscription): Observable<Inscription> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post<Inscription>(
      this.apiUrl,
      inscription,
      httpOptions
    );
  }

  updateInscription(inscription: Inscription): Observable<Inscription> {
    return this.httpClient.put<Inscription>(
      `${this.apiUrl}/${inscription.id}`,
      inscription,
      this.getHttpOptions()
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getHttpOptions()
    );
  }
}
