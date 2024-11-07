import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnneeScolaire } from '../../models/annee-scolaire/annee-scolaire.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnneeScolaireService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(private httpClient: HttpClient) {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  getAnneesScolaires() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/annees_scolaires`,
      httpOptions
    );
  }

  insertAnneeScolaire(
    anneeScolaire: AnneeScolaire
  ): Observable<AnneeScolaire> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };

    console.log('Data being sent:', anneeScolaire); // Add this log to inspect the data
    return this.httpClient.post<AnneeScolaire>(
      `${this.apiUrl}/annees_scolaires`,
      anneeScolaire,
      httpOptions
    );
  }

  updateAnneeScolaire(
    AnneeScolaire: AnneeScolaire
  ): Observable<AnneeScolaire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<AnneeScolaire>(
      `${this.apiUrl}/annees_scolaires/${AnneeScolaire.id}`,
      AnneeScolaire,
      httpOptions
    );
  }

  deleteAnneeScolaire(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.delete<any>(
      `${this.apiUrl}/annees_scolaires/${id}`,
      httpOptions
    );
  }

  getNiveauxScolairesById(id: any): Observable<AnneeScolaire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<AnneeScolaire>(
      `${this.apiUrl}/annees_scolaires/${id}`,
      httpOptions
    );
  }
}
