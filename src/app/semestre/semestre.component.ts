import { Component } from '@angular/core';
import { Semestre } from '../models/semestre/semestre.model';
import { SemestreService } from '../services/semestre/semestre.service';
import { NiveauScolaireService } from '../services/niveau-scolaire/niveau-scolaire.service';
import { AnneeScolaireService } from '../services/annee-scolaire/annee-scolaire.service';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NiveauScolaire } from '../models/niveau-scolaire/niveau-scolaire.model';

@Component({
  selector: 'app-semestre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './semestre.component.html',
  styleUrl: './semestre.component.css',
})
export class SemestreComponent {
  semestres: any[] = [];
  semestre: Semestre;
  editingSemestre: Semestre = new Semestre();

  anneesScolaires: any[] = [];
  niveaux: any[] = []; // Levels list
  applyToAllLevels: boolean = false; // Checkbox state

  constructor(
    private semestreService: SemestreService,
    private anneeScolaireService: AnneeScolaireService,
    private niveauScolaireService: NiveauScolaireService,
    private router: Router
  ) {
    this.semestre = new Semestre();
  }

  ngOnInit(): void {
    this.getSemestreData();
    this.loadNiveaux();
    this.loadAnnees();
  }

  getSemestreData() {
    this.semestreService.getSemestres().subscribe((res) => {
      // console.log(res);
      this.semestres = res;
    });
  }

  loadNiveaux() {
    this.niveauScolaireService.getNiveauxScolaires().subscribe((res) => {
      this.niveaux = res['niveauxScolaires'];
    });
  }
  loadAnnees() {
    this.anneeScolaireService.getAnneesScolaires().subscribe((res) => {
      this.anneesScolaires = res;
    });
  }

  insertSemestre() {
    // Collect selected level IDs
    const selectedNiveauIds = this.niveaux
      .filter((niveau) => niveau.selected)
      .map((niveau) => niveau.id);

    // Include selected levels in semestre object
    const semestreData = {
      ...this.semestre,
      niveau_ids: selectedNiveauIds, // Pass array of selected level IDs
    };
    this.semestreService.insertSemestre(semestreData).subscribe((res) => {
      window.location.reload();
    });
  }

  deleteSemestre(id: any) {
    this.semestreService.deleteSemestre(id).subscribe((res) => {
      this.getSemestreData();
    });
  }

  // Select a semestre to edit and open the modal
  openEditModal(semestre: Semestre) {
    this.editingSemestre = { ...semestre }; // Make a copy to edit
    this.initializeSelectedNiveaux(); // Initialize selected niveaux
  }

  // Initialize selected niveaux
  initializeSelectedNiveaux() {
    // Reset all levels to not selected
    this.niveaux.forEach((niveau) => {
      niveau.checked = false; // Ensure that checked is reset for each niveau
    });
    //console.log(this.editingSemestre, 'this.editingSemestre')
    // Mark the niveaux in the semestre as selected
    if (this.editingSemestre.niveau_semestres) {
      this.editingSemestre.niveau_semestres.forEach((niveau) => {
        const match = this.niveaux.find(
          (n) => n.id === niveau.niveau_scolaire_id
        );
        if (match) {
          match.checked = true; // Mark the matched niveau as checked
        }
      });
    }
  }

  // Update Semestre data on the server
  updateSemestre() {
    if (this.editingSemestre) {
      const selectedNiveauIds = this.niveaux
        .filter((niveau) => niveau.checked)
        .map((niveau) => niveau.id);

      // Include selected levels in semestre object
      const editingSemestreData = {
        ...this.editingSemestre,
        niveau_ids: selectedNiveauIds,
      };

      this.semestreService
        .updateSemestre(editingSemestreData)
        .subscribe((res) => {
          this.getSemestreData();
          this.editingSemestre = new Semestre();
          window.location.reload();
        });
    }
  }
}
