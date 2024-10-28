import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NiveauScolaire } from '../../models/niveau-scolaire/niveau-scolaire.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NiveauScolaireService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(private httpClient: HttpClient) {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  getNiveauxScolaires() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/niveauxScolaires`,
      httpOptions
    );
  }

  insertNiveauxScolaires(
    niveauxScolaire: NiveauScolaire
  ): Observable<NiveauScolaire> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<NiveauScolaire>(
      `${this.apiUrl}/addNiveauScolaire`,
      niveauxScolaire,
      httpOptions
    );
  }

  updateNiveauxScolaires(
    id: any,
    data: NiveauScolaire
  ): Observable<NiveauScolaire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.put<NiveauScolaire>(
      `${this.apiUrl}/updateNiveauScolaire/${id}`,
      data,
      httpOptions
    );
  }

  //updateProduct(id:any,data:Product){
  //return this.httpClient.put('http://127.0.0.1:8000/api/updateProduct/'+id,data);
  //}

  deleteNiveauxScolaires(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.delete<any>(
      `${this.apiUrl}/deleteNiveauScolaire/${id}`,
      httpOptions
    );
  }

  //deletetData(id:any){
  //return this.httpClient.delete('http://127.0.0.1:8000/api/deleteProduct/'+id);
  //}

  getNiveauxScolairesById(id: any): Observable<NiveauScolaire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<NiveauScolaire>(
      `${this.apiUrl}/niveauScolaire/${id}`,
      httpOptions
    );
  }

  //geProductById(id:any){
  //return this.httpClient.get('http://127.0.0.1:8000/api/product/'+id);
  //}
}
