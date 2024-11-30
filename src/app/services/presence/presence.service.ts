import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private apiUrl = `${environment.apiUrl}/${environment.prefix}/presences`;
  token: any;

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
  getPresencesByYear(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/year`,this.getHttpOptions());
  }

  storePresences(seanceId: number, presences: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/seances/${seanceId}`, 
      presences, 
      this.getHttpOptions()
    );
  }

  marquerPresenceEleve(seanceId: number, eleveId: number, present: boolean): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/eleve`, { seance_id: seanceId, eleve_id: eleveId, present });
  }

  marquerPresenceEnseignant(seanceId: number, enseignantId: number, present: boolean): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/enseignant`, { seance_id: seanceId, enseignant_id: enseignantId, present });
  }

  obtenirPresencesParSeance(seanceId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/obtenirPresences/${seanceId}`,this.getHttpOptions() );
  }
}
