import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../../models/matiere/matiere.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/matieres`;

  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');

  getMatieres(): Observable<Matiere[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<Matiere[]>(this.apiUrl, httpOptions);
  }

  getMatiere(id: number): Observable<Matiere> {
    return this.httpClient.get<Matiere>(`${this.apiUrl}/${id}`);
  }

  createMatiere(matiere: Matiere): Observable<Matiere> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post<Matiere>(this.apiUrl, matiere, httpOptions);
  }

  updateMatiere(id: number, matiere: Matiere): Observable<Matiere> {
    return this.httpClient.put<Matiere>(`${this.apiUrl}/${id}`, matiere);
  }

  deleteMatiere(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
