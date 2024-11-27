import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Eleve } from '../../models/eleve/eleve.model';
import { Semestre } from '../../models/semestre/semestre.model';
import { Note } from '../../models/note/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/notes`;
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

  // Obtenir toutes les notes
  getNotes(): Observable<any> {
    return this.httpClient.get(this.apiUrl, this.getHttpOptions());
  }

  // Ajouter une note
  addNote(note: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, note, this.getHttpOptions());
  }

  // Mettre à jour une note
  updateNote(note: Note): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${note.id}`, note,
      this.getHttpOptions());
  }

  // Supprimer une note
  deleteNote(id: number): Observable<any> {
    return this.httpClient.delete(
      `${this.apiUrl}/${id}`,
      this.getHttpOptions()
    );
  }

  getNotesBySemestreForEleve(eleve: Eleve, semestre: Semestre): Observable<any[]> {
   // console.log('eleve.id ',eleve.id)
    console.log('semestre.id ',semestre)

    const payload = { eleve_id: eleve.id, semestre_id: semestre };
    return this.httpClient.post<any[]>(
      `${this.apiUrl}/getNotesBySemestreForEleve`,payload, this.getHttpOptions()
    );
  }
}
