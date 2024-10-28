import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrancheHoraire } from '../../models/tranche-horaire/tranche-horaire.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrancheHoraireServiceService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  token: any;

  constructor(private httpClient: HttpClient) {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }


  getTranchesHoraires(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ localStorage.getItem('token')
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.httpClient.get<any>(`${this.apiUrl}/TranchesHoraires`,httpOptions);
  }


  




  insertTrancheHoraire(trancheHoraire: TrancheHoraire): Observable<TrancheHoraire> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<TrancheHoraire>(`${this.apiUrl}/addTrancheHoraire`, trancheHoraire, httpOptions);
  }

  

  updateTrancheHoraire(id: any, data: TrancheHoraire): Observable<TrancheHoraire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.put<TrancheHoraire>(`${this.apiUrl}/updateTrancheHoraire/${id}`, data, httpOptions);
  }

  
  //updateProduct(id:any,data:Product){
    //return this.httpClient.put('http://127.0.0.1:8000/api/updateProduct/'+id,data);
  //}




  deleteTrancheHoraire(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.delete<any>(`${this.apiUrl}/deleteTrancheHoraire/${id}`, httpOptions);
  }

 
  //deletetData(id:any){
    //return this.httpClient.delete('http://127.0.0.1:8000/api/deleteProduct/'+id);
  //}


  getTrancheHoraireById(id: any): Observable<TrancheHoraire> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get<TrancheHoraire>(`${this.apiUrl}/TrancheHoraire/${id}`, httpOptions);
  }

  //geProductById(id:any){
    //return this.httpClient.get('http://127.0.0.1:8000/api/product/'+id);
  //}
  

}
