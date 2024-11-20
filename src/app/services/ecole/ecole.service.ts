import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Ecole } from '../../models/ecole/ecole.model';
import { Observable } from 'rxjs';
import { Role } from '../../models/role/role.model';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EcoleService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if localStorage is available and set the token
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null; // or handle it as needed
    }
  }

  getEcole(): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`, // Use the token retrieved in the constructor
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(`${this.apiUrl}/ecole`, httpOptions);
  }

  insertEcole(ecole: Ecole): Observable<Ecole> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<Ecole>(
      `${this.apiUrl}/addEcole`,
      ecole,
      httpOptions
    );
  }

  updateEcole(data: Ecole): Observable<Ecole> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<Ecole>(
      `${this.apiUrl}/updateEcole/${data.id}`,
      data,
      httpOptions
    );
  }
  deleteEcole(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.delete<any>(
      `${this.apiUrl}/deleteEcole/${id}`,
      httpOptions
    );
  }
  getVilles() {
    console.log(this.token);
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(`${this.apiUrl}/Villes`, httpOptions);
  }

  getEcoleById(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<Ecole>(
      `${this.apiUrl}/ecole/${id}`,
      httpOptions
    );
  }
}
