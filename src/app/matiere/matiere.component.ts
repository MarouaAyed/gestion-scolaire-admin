import { Component, OnInit } from '@angular/core';
import { Matiere } from '../models/matiere/matiere.model';
import { MatiereService } from '../services/matiere/matiere.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Enseignant } from '../models/enseignant/enseignant.model';
import { EnseignantService } from '../services/enseignant/enseignant.service';
import { NiveauSemestre } from '../models/niveau-semestre/niveau-semestre.model';
import { NiveauSemestreService } from '../services/niveau-semestre/niveau-semestre.service';

@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css',
})
export class MatiereComponent implements OnInit {
  matieres: Matiere[] = [];
  matiere: Matiere;
  enseignants: Enseignant[] = [];
  niveauSemestres: NiveauSemestre[] = []; 

  constructor(
    private matiereService: MatiereService,
    private enseignantService: EnseignantService,   private niveauSemestreService: NiveauSemestreService
  ) {
    this.matiere= new Matiere()
  }

  ngOnInit(): void {
    this.loadMatieres();
    this.loadEnseignants();
    this.loadNiveauSemestres();
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

  loadEnseignants(): void {
    this.enseignantService.getEnseignants().subscribe(
      (data: Enseignant[]) => {
        this.enseignants = data;
      },
      (error) => {
        console.error('Error fetching enseignants:', error);
      }
    );
  }

  loadNiveauSemestres(): void {
    this.niveauSemestreService.getNiveauSemestres().subscribe(
      (data: NiveauSemestre[]) => {
        console.log(data)
        this.niveauSemestres = data;
      },
      (error) => {
        console.error('Error fetching niveau semestres:', error);
      }
    );
  }

  insertMatiere(): void {
    this.matiereService.createMatiere(this.matiere).subscribe(
      (data: Matiere) => {
    //    this.matieres.push(data);
        window.location.reload();
      },
      (error) => {
        console.error('Error creating matiere:', error);
      }
    );
  }

  updateMatiere(): void {
    /* this.matiereService.updateMatiere( this.updatedMatiere).subscribe(
      (data: Matiere) => {
        const index = this.matieres.findIndex(m => m.id === id);
        if (index !== -1) this.matieres[index] = data;
      },
      (error) => {
        console.error('Error updating matiere:', error);
      }
    ); */
  }

  deleteMatiere(id: number): void {
    this.matiereService.deleteMatiere(id).subscribe(
      () => {
        this.matieres = this.matieres.filter((m) => m.id !== id);
      },
      (error) => {
        console.error('Error deleting matiere:', error);
      }
    );
  }
}
