import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/profile`;
  token: any;

  constructor(private httpClient: HttpClient) {}

  // Getter for httpOptions to be used in all API calls
  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  // Obtenir les informations du profil
  getProfile(): Observable<any> {
    return this.httpClient.get(this.apiUrl, this.getHttpOptions());
  }

  // Mettre à jour les informations du profil
  updateProfile(profileData: any): Observable<any> {
    return this.httpClient.put(this.apiUrl, profileData, this.getHttpOptions());
  }
}
