import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semestre } from '../../models/semestre/semestre.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SemestreService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/semestres`;

  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');


  // Get all semestres
  getSemestres(): Observable<Semestre[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<Semestre[]>(this.apiUrl,httpOptions);
  }

  // Insert a new semestre
  insertSemestre(semestre: Semestre): Observable<Semestre> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post<Semestre>(this.apiUrl, semestre,httpOptions)
  }

  // Delete a semestre by ID
  deleteSemestre(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update an existing semestre
  updateSemestre(semestre: Semestre): Observable<Semestre> {
    return this.httpClient.put<Semestre>(`${this.apiUrl}/${semestre.id}`, semestre, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
