import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NiveauSemestre } from '../../models/niveau-semestre/niveau-semestre.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauSemestreService {

  private apiUrl = `${environment.apiUrl}/${environment.prefix}/niveau-semestres`;

  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');

  getNiveauSemestres(): Observable<NiveauSemestre[]> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.get<NiveauSemestre[]>(this.apiUrl,httpOptions);
  }
}
