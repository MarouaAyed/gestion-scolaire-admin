import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrancheHoraireServiceService } from '../services/tranche-horaire/tranche-horaire.service';
import { TrancheHoraire } from '../models/tranche-horaire/tranche-horaire.model';

@Component({
  selector: 'app-tranche-horaire',
  templateUrl: './tranche-horaire.component.html',
  styleUrls: ['./tranche-horaire.component.scss'],
})
export class TrancheHoraireComponent implements OnInit {
  tranchehoraires: any;

  tranchehoraire = new TrancheHoraire();
  constructor(
    private tranchehoraireService: TrancheHoraireServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTrancheHoraireData();
  }
  getTrancheHoraireData() {
    this.tranchehoraireService.getTranchesHoraires().subscribe((res) => {
      this.tranchehoraires = res['tranchehoraires'];
    });
  }
  insertTrancheHoraireData() {
    this.tranchehoraireService
      .insertTrancheHoraire(this.tranchehoraire)
      .subscribe((res) => {
        window.location.reload();
      });
  }

  deleteTrancheHoraire(id: any) {
    this.tranchehoraireService.deleteTrancheHoraire(id).subscribe((res) => {
      this.getTrancheHoraireData();
    });
  }

  updateTrancheHoraire(id: any): void {
    this.router.navigate(['/edit-tranche-horaire', id]);
  }
}
