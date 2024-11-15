import { Component, OnInit } from '@angular/core';
import { Seance } from '../models/seance/seance.model';
import { SeanceService } from '../services/seance/seance.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Matiere } from '../models/matiere/matiere.model';
import { MatiereService } from '../services/matiere/matiere.service';
import { Groupe } from '../models/groupe/groupe.model';
import { Salle } from '../models/salle/salle.model';
import { TrancheHoraire } from '../models/tranche-horaire/tranche-horaire.model';
import { TrancheHoraireServiceService } from '../services/tranche-horaire/tranche-horaire.service';
import { GroupeService } from '../services/groupe/groupe.service';
import { SalleService } from '../services/salle/salle.service';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css',
})
export class SeanceComponent implements OnInit {
  groupes: Groupe[] = [];
  matieres: Matiere[] = [];
  salles: Salle[] = [];
  tranchehoraires: TrancheHoraire[] = [];
  days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  seances: any[] = [];
  seance: Seance;
  editingSeance: Seance = new Seance();

  constructor(
    private seanceService: SeanceService,
    private router: Router,
    private groupeService: GroupeService,
    private matiereService: MatiereService,
    private salleService: SalleService,
    private tranchehoraireService: TrancheHoraireServiceService
  ) {
    this.seance = new Seance();
  }
  ngOnInit(): void {
    this.getSeanceData();
    this.loadGroupes();
    this.loadMatieres();
    this.getSalleData();
    this.getTrancheHoraireData();
  }

  getSeanceData(): void {
      this.seanceService.getSeances().subscribe(
        (data: Seance[]) => {
          console.log('data ', data)
          this.seances = data;
        },
        (error) => {
          console.error('Error fetching niveau seances:', error);
        }
      );
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

  getSalleData() {
    this.salleService.getSalles().subscribe((res) => {
      this.salles = res['salles'];
    });
  }
  getTrancheHoraireData() {
    this.tranchehoraireService.getTranchesHoraires().subscribe((res) => {
      this.tranchehoraires = res['tranchehoraires'];
    });
  }

  insertSeance() {
    this.seanceService.createSeance(this.seance).subscribe((res) => {
      this.seances.push(res);
      this.seance = new Seance();
    });
  }


  // Select a ville to edit and open the modal
  /*  openEditVilleModal(ville: Ville) {
    this.editingVille = { ...ville }; // Make a copy to edit
  }

  // Update Ville data on the server
  updateVille() {
    if (this.editingVille) {
      this.villeService.updateVille(this.editingVille).subscribe((res) => {
        this.getVilleData();
        this.editingVille = new Ville();
      });
    }
  }

  deleteVille(id: any) {
    this.villeService.deleteVille(id).subscribe((res) => {
      this.getVilleData();
    });
  } */
}
