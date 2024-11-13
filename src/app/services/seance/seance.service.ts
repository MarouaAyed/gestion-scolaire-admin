import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance } from '../../models/seance/seance.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;

  constructor(private httpClient: HttpClient) {}
  token: any = localStorage.getItem('token');



  getSeancesByGroup(groupId: number): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>(`/api/seances/group/${groupId}`);
  }
  
}
