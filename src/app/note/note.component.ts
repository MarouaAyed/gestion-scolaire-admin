import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note/note.service';
import { Note } from '../models/note/note';
import { EleveService } from '../services/eleve/eleve.service';
import { Matiere } from '../models/matiere/matiere.model';
import { Eleve } from '../models/eleve/eleve.model';
import { MatiereService } from '../services/matiere/matiere.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = new Note();
  eleves: Eleve[] = [];
  matieres: Matiere[] = [];

  loading = false;

  constructor(
    private noteService: NoteService,
    private eleveService: EleveService,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.getEleves();
    this.loadMatieres();
  }

  // Charger toutes les notes
  loadNotes(): void {
    this.loading = true;
    this.noteService.getNotes().subscribe(
      (data: Note[]) => {
        this.notes = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des notes', error);
        this.loading = false;
      }
    );
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((res) => {
      this.eleves = res['eleves'];
    });
  }

  loadMatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (data: Matiere[]) => {
        this.matieres = data;
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }

  // Ajouter une nouvelle note
  addNote(): void {
    this.noteService.addNote(this.newNote).subscribe(
      (data: Note) => {
        this.notes.push(data); // Ajouter la nouvelle note à la liste
        this.newNote = new Note(); // Réinitialiser le formulaire
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la note", error);
      }
    );
  }

  // Supprimer une note
  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(
      () => {
        this.notes = this.notes.filter((note) => note.id !== id); // Retirer la note de la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression de la note', error);
      }
    );
  }
}
