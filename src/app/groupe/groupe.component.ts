import { Component } from '@angular/core';
import { Groupe } from '../models/groupe/groupe.model';
import { NiveauSemestre } from '../models/niveau-semestre/niveau-semestre.model';
import { GroupeService } from '../services/groupe/groupe.service';
import { NiveauSemestreService } from '../services/niveau-semestre/niveau-semestre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groupe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groupe.component.html',
  styleUrl: './groupe.component.css',
})
export class GroupeComponent {
  groupes: Groupe[] = [];
  groupe: Groupe;
  niveauSemestres: NiveauSemestre[] = [];

  constructor(
    private groupeService: GroupeService,
    private niveauSemestreService: NiveauSemestreService
  ) {
    this.groupe = new Groupe();
  }

  ngOnInit(): void {
    this.loadGroupes();
    this.loadNiveauSemestres();
  }

  loadGroupes(): void {
    this.groupeService.getGroupes().subscribe(
      (data: Groupe[]) => {
        this.groupes = data;
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }

  loadNiveauSemestres(): void {
    this.niveauSemestreService.getNiveauSemestres().subscribe(
      (data: NiveauSemestre[]) => {
        console.log(data);
        this.niveauSemestres = data;
      },
      (error) => {
        console.error('Error fetching niveau semestres:', error);
      }
    );
  }

  insertGroupe(): void {
    this.groupeService.createGroupe(this.groupe).subscribe(
      (data: Groupe) => {
        this.groupes.push(data);
      },
      (error) => {
        console.error('Error creating Groupe:', error);
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

  /*  deleteMatiere(id: number): void {
    this.matiereService.deleteMatiere(id).subscribe(
      () => {
        this.matieres = this.matieres.filter((m) => m.id !== id);
      },
      (error) => {
        console.error('Error deleting matiere:', error);
      }
    );
  } */
}
