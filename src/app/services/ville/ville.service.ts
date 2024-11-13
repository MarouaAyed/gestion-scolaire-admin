import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ville } from '../../models/ville/ville.model';
import { Adresse } from '../../models/adresse/adresse.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VilleService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  private villesSubject = new BehaviorSubject<Ville[]>([]);
  villes$ = this.villesSubject.asObservable(); // Observable for components to subscribe to

  private adressesSubject = new BehaviorSubject<Adresse[]>([]);
  adresses$ = this.adressesSubject.asObservable();

  token: any;

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  getVilles(): void {
    console.log(this.token);
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };

    this.httpClient.get<any>(`${this.apiUrl}/Villes`, httpOptions).subscribe(
      (res) => {
        this.villesSubject.next(res['Villes']); // Update the BehaviorSubject with the new data
      },
      (error) => {
        console.error('Error fetching villes:', error);
      }
    );
  }

  getAddressesByCityId(ville_id: string): Observable<string[]> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient
      .get<any>(`${this.apiUrl}/Adresses/${ville_id}`, httpOptions)
  }

  insertVille(ville: Ville): Observable<Ville> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<Ville>(
      `${this.apiUrl}/addVille`,
      ville,
      httpOptions
    );
  }

  updateVille(ville: Ville): Observable<Ville> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<Ville>(
      `${this.apiUrl}/updateVille/${ville.id}`,
      ville,
      httpOptions
    );
  }

  deleteVille(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.delete<any>(
      `${this.apiUrl}/deleteVille/${id}`,
      httpOptions
    );
  }

  getVilleById(id: any): Observable<Ville> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<Ville>(
      `${this.apiUrl}/Ville/${id}`,
      httpOptions
    );
  }
}
