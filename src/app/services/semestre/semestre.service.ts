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

  // Get all semestres
  getSemestres(): Observable<Semestre[]> {
    return this.httpClient.get<Semestre[]>(this.apiUrl, this.getHttpOptions());
  }

  // Insert a new semestre
  insertSemestre(semestre: Semestre): Observable<Semestre> {
    return this.httpClient.post<Semestre>(this.apiUrl, semestre, this.getHttpOptions());
  }

  // Delete a semestre by ID
  deleteSemestre(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  // Update an existing semestre
  updateSemestre(semestre: Semestre): Observable<Semestre> {
    return this.httpClient.put<Semestre>(
      `${this.apiUrl}/${semestre.id}`,
      semestre,
      this.getHttpOptions()
    );
  }
}
