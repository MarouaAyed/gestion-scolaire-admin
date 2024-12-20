import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance } from '../../models/seance/seance.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/seances`;

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

  getEmploiDuTempsByGroupe(groupId: number): Observable<Seance[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<Seance[]>(
      `${this.apiUrl}/groupe/${groupId}`,
      httpOptions
    );
  }

  getSeances(): Observable<Seance[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<Seance[]>(this.apiUrl, httpOptions);
  }

  getSeance(id: number): Observable<Seance> {
    return this.httpClient.get<Seance>(`${this.apiUrl}/${id}`);
  }

  createSeance(seance: Seance): Observable<Seance> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post<Seance>(this.apiUrl, seance, httpOptions);
  }

  updateSeance(seance: Seance): Observable<Seance> {
    return this.httpClient.put<Seance>(
      `${this.apiUrl}/${seance.id}`,
      seance,
      this.getHttpOptions()
    );
  }

  deleteSeance(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getHttpOptions()
    );
  }
}
