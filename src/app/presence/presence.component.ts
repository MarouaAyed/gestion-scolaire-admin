import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../services/presence/presence.service';
import { Seance } from '../models/seance/seance.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presence',
  imports: [CommonModule],
  standalone: true,  
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  presencesEleves: any[] = [];
  presencesEnseignants: any[] = [];
  seance : Seance

  constructor(private presenceService: PresenceService) {}

  ngOnInit(): void {
    this.obtenirPresences(1); // Exemple: Charger les présences pour une séance donnée (ID=1)
  }

  marquerPresenceEleve(seanceId: number, eleveId: number, present: boolean): void {
    this.presenceService.marquerPresenceEleve(seanceId, eleveId, present).subscribe(() => {
      this.obtenirPresences(seanceId);
    });
  }

  marquerPresenceEnseignant(seanceId: number, enseignantId: number, present: boolean): void {
    this.presenceService.marquerPresenceEnseignant(seanceId, enseignantId, present).subscribe(() => {
      this.obtenirPresences(seanceId);
    });
  }

  obtenirPresences(seanceId: number): void {
    this.presenceService.obtenirPresencesParSeance(seanceId).subscribe((data) => {
      console.log("obtenirPresences ",data)
      this.presencesEleves = data.eleves;
      this.presencesEnseignants = data.enseignants;
      this.seance = data.seance;
    });
  }
}
