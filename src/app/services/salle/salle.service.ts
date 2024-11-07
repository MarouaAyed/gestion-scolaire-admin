import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Salle } from '../../models/salle/salle.model';

@Injectable({
  providedIn: 'root',
})
export class SalleService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');

  getSalles() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(`${this.apiUrl}/salles`, httpOptions);
  }

  insertSalle(salle: Salle): Observable<Salle> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<Salle>(
      `${this.apiUrl}/salles`,
      salle,
      httpOptions
    );
  }

  updateSalle( salle: Salle): Observable<Salle> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<Salle>(
      `${this.apiUrl}/salles/${salle.id}`,
      salle,
      httpOptions
    );
  }

  deleteSalle(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.delete<any>(
      `${this.apiUrl}/salles/${id}`,
      httpOptions
    );
  }

  getSalleById(id: any): Observable<Salle> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<Salle>(
      `${this.apiUrl}/salle/${id}`,
      httpOptions
    );
  }
}
