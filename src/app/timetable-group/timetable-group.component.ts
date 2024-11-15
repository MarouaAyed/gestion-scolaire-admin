import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SeanceService } from '../services/seance/seance.service';
import { CommonModule } from '@angular/common';
import { TrancheHoraire } from '../models/tranche-horaire/tranche-horaire.model';
import { TrancheHoraireServiceService } from '../services/tranche-horaire/tranche-horaire.service';

@Component({
  selector: 'app-timetable-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timetable-group.component.html',
  styleUrls: ['./timetable-group.component.css'],
})
export class TimetableGroupComponent implements OnChanges {
  @Input() groupeId: number;
  @Input() key: number;

  emploiDuTemps: any[] = [];
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  tranchesHoraires: TrancheHoraire[] = [];
  constructor(
    private seanceService: SeanceService,
    private tranchehoraireService: TrancheHoraireServiceService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupeId']) {
      const currentGroupeId = changes['groupeId'].currentValue;
      console.log('Le groupeId a changé:', currentGroupeId);
      this.getEmploiDuTemps(currentGroupeId);
    }

    // Vous pouvez également écouter les changements de la clé si nécessaire
    if (changes['key']) {
      const currentKey = changes['key'].currentValue;
      console.log('La clé a changé:', currentKey);
    }
  }


  ngOnInit(): void {
    if (this.groupeId) {
      this.getEmploiDuTemps(this.groupeId);
      this.getTrancheHoraireData();
    }
  }

  getTrancheHoraireData() {
    this.tranchehoraireService.getTranchesHoraires().subscribe((res) => {
      this.tranchesHoraires = res['tranchehoraires'];
    });
  }

  // Fonction pour récupérer l'emploi du temps du groupe
  getEmploiDuTemps(groupeId: number): void {
    console.log('groupeId ', groupeId);
    this.seanceService
      .getEmploiDuTempsByGroupe(groupeId)
      .subscribe((emploi) => {
        this.emploiDuTemps = emploi;
        console.log('Emploi du temps pour le groupe:', this.emploiDuTemps);
      });
  }

  getSeancesForTrancheAndJour(tranche, jour): any[] {
    return this.emploiDuTemps.filter(
      (seance) =>
        seance.tranche_horaire.heure_debut == tranche.heure_debut &&
        seance.tranche_horaire.heure_fin == tranche.heure_fin &&
        seance.day == jour // Assurez-vous que votre objet `seance` a bien un champ `jour`
    );
  }
}
