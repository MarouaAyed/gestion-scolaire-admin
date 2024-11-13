import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Groupe } from '../../models/groupe/groupe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/groupes`;

  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');

  getGroupes(): Observable<Groupe[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<Groupe[]>(this.apiUrl, httpOptions);
  }

  getGroupe(id: number): Observable<Groupe> {
    return this.httpClient.get<Groupe>(`${this.apiUrl}/${id}`);
  }

  createGroupe(matiere: Groupe): Observable<Groupe> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.post<Groupe>(this.apiUrl, matiere, httpOptions);
  }

}
