import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../services/presence/presence.service';
import { Seance } from '../models/seance/seance.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../services/seance/seance.service';

@Component({
  selector: 'app-presence',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css'],
})
export class PresenceComponent implements OnInit {
  groupedPresences: any[] = [];
  presencesEleves: any[] = [];
  presencesEnseignants: any[] = [];
  seances: any[] = [];
  seance: Seance;
  presenceEnseignant: boolean = false;
  selectedSeance: any;

  constructor(
    private presenceService: PresenceService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    this.getSeanceData();

    this.presenceService.getPresencesByYear().subscribe(
      (data: any) => {
        this.groupedPresences = data; // Stocker les données dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des présences', error);
      }
    );

    this.obtenirPresences(1); // Exemple: Charger les présences pour une séance donnée (ID=1)
  }

  getSeanceData(): void {
    this.seanceService.getSeances().subscribe(
      (data: Seance[]) => {
        console.log('data ', data);
        this.seances = data;
      },
      (error) => {
        console.error('Error fetching niveau seances:', error);
      }
    );
  }

  onSeanceSelect() {
    console.log('Session selected:', this.selectedSeance);
  }

  storePresences() {
    if (!this.selectedSeance?.groupe?.students || !this.selectedSeance.id) {
      alert('Les données de la séance sont incomplètes.');
      return;
    }

    const presences = {
      enseignant: { present: this.presenceEnseignant },
      eleves: this.selectedSeance.groupe.students.map((eleve: any) => ({
        eleve_id: eleve.id,
        present: eleve.present,
      })),
    };

    this.presenceService.storePresences(this.selectedSeance.id, presences).subscribe(
      (response) => {
        alert('Présences enregistrées avec succès');
        window.location.reload();
      },
      (error) => {
        alert("Erreur lors de l'enregistrement des présences");
      }
    );
  }

  marquerPresenceEleve(
    seanceId: number,
    eleveId: number,
    present: boolean
  ): void {
    this.presenceService
      .marquerPresenceEleve(seanceId, eleveId, present)
      .subscribe(() => {
        this.obtenirPresences(seanceId);
      });
  }

  marquerPresenceEnseignant(
    seanceId: number,
    enseignantId: number,
    present: boolean
  ): void {
    this.presenceService
      .marquerPresenceEnseignant(seanceId, enseignantId, present)
      .subscribe(() => {
        this.obtenirPresences(seanceId);
      });
  }

  obtenirPresences(seanceId: number): void {
    this.presenceService
      .obtenirPresencesParSeance(seanceId)
      .subscribe((data) => {
        console.log('obtenirPresences ', data);
        this.presencesEleves = data.eleves;
        this.presencesEnseignants = data.enseignants;
        this.seance = data.seance;
      });
  }
}
