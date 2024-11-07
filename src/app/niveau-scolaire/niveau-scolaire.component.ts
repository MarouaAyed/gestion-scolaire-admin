import { Component, OnInit } from '@angular/core';
import { NiveauScolaire } from '../models/niveau-scolaire/niveau-scolaire.model';
import { Router } from '@angular/router';
import { NiveauScolaireService } from '../services/niveau-scolaire/niveau-scolaire.service';

@Component({
  selector: 'app-niveau-scolaire',
  templateUrl: './niveau-scolaire.component.html',
  styleUrls: ['./niveau-scolaire.component.scss'],
})
export class NiveauScolaireComponent implements OnInit {
  niveauxScolaires: any[] = [];
  niveauScolaire: NiveauScolaire;
  editingNiveauScolaire: NiveauScolaire = new NiveauScolaire();

  constructor(
    private niveauScolaireService: NiveauScolaireService,
    private router: Router
  ) {
    this.niveauScolaire = new NiveauScolaire();
  }

  ngOnInit(): void {
    this.getNiveauScolaireData();
  }

  getNiveauScolaireData() {
    this.niveauScolaireService.getNiveauxScolaires().subscribe((res) => {
      this.niveauxScolaires = res['niveauxScolaires'];
    });
  }
  insertNiveauScolaire() {
    this.niveauScolaireService
      .insertNiveauxScolaires(this.niveauScolaire)
      .subscribe((res) => {
        this.niveauxScolaires.push(res);
        this.niveauScolaire = new NiveauScolaire();
      });
  }

  deleteNiveauScolaire(id: any) {
    this.niveauScolaireService.deleteNiveauxScolaires(id).subscribe((res) => {
      this.getNiveauScolaireData();
    });
  }

  // Select a NiveauScolaire to edit and open the modal
  openEditModalNiveauxScolaire(niveauScolaire: NiveauScolaire) {
    this.editingNiveauScolaire = { ...niveauScolaire }; // Make a copy to edit
  }

  // Update NiveauScolaire data on the server
  updateNiveauxScolaire() {
    if (this.editingNiveauScolaire) {
      this.niveauScolaireService
        .updateNiveauxScolaires(this.editingNiveauScolaire)
        .subscribe((res) => {
          this.getNiveauScolaireData();
          this.editingNiveauScolaire = new NiveauScolaire();
        });
    }
  }
}
