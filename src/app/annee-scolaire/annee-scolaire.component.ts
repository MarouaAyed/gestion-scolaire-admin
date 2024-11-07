import { Component, OnInit } from '@angular/core';
import { AnneeScolaire } from '../models/annee-scolaire/annee-scolaire.model';
import { Router } from '@angular/router';
import { AnneeScolaireService } from '../services/annee-scolaire/annee-scolaire.service';

@Component({
  selector: 'app-annee-scolaire',
  templateUrl: './annee-scolaire.component.html',
  styleUrls: ['./annee-scolaire.component.scss'],
})
export class AnneeScolaireComponent implements OnInit {
  anneesScolaires: any[] = [];
  anneeScolaire: AnneeScolaire;
  editingAnneeScolaire: AnneeScolaire = new AnneeScolaire();

  constructor(
    private anneeScolaireService: AnneeScolaireService,
    private router: Router
  ) {
    this.anneeScolaire = new AnneeScolaire();
  }

  ngOnInit(): void {
    this.getAnneeScolaireData();
  }

  getAnneeScolaireData() {
    this.anneeScolaireService.getAnneesScolaires().subscribe((res) => {
      this.anneesScolaires = res;
    });
  }
  insertAnneeScolaire() {
    console.log(this.anneeScolaire);
    this.anneeScolaireService
      .insertAnneeScolaire(this.anneeScolaire)
      .subscribe((res) => {
        this.anneesScolaires.push(res);
        this.anneeScolaire = new AnneeScolaire();
      });
  }

  deleteNiveauScolaire(id: any) {
    this.anneeScolaireService.deleteAnneeScolaire(id).subscribe((res) => {
      this.getAnneeScolaireData();
    });
  }

  // Select a AnneeScolaire to edit and open the modal
  openEditModalAnneeScolaire(anneeScolaire: AnneeScolaire) {
    this.editingAnneeScolaire = { ...anneeScolaire }; // Make a copy to edit
  }

  // Update AnneeScolaire data on the server
  updateAnneeScolaire() {
    if (this.editingAnneeScolaire) {
      this.anneeScolaireService
        .updateAnneeScolaire(this.editingAnneeScolaire)
        .subscribe((res) => {
          this.getAnneeScolaireData();
          this.editingAnneeScolaire = new AnneeScolaire();
        });
    }
  }
}
