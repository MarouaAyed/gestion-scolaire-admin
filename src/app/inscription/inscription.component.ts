import { Component, OnInit } from '@angular/core';
import { Inscription } from '../models/inscription/inscription.model';
import { InscriptionService } from '../services/inscription/inscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent implements OnInit {
  inscriptions: any[] = [];
  inscription: Inscription;
  editingInscription: Inscription = new Inscription();

  constructor(private inscriptionService: InscriptionService) {
    this.inscription = new Inscription();
  }
  ngOnInit(): void {
    this.getInscriptionData();
  }

  getInscriptionData() {
    this.inscriptionService.getInscriptions().subscribe(
      (data: Inscription[]) => {
        console.log('data ',data)
        this.inscriptions = data;
      },
      (error) => {
        console.error('Error fetching Inscriptions:', error);
      }
    );
  }

  // Select a Inscription to edit and open the modal
   openEditInscriptionModal(inscription: Inscription) {
    this.editingInscription = { ...inscription }; // Make a copy to edit
  }

  // Update Ville data on the server
  updateInscription() {
   /*  if (this.editingInscription) {
      this.villeService.updateVille(this.editingVille).subscribe((res) => {
        this.getVilleData();
        this.editingVille = new Ville();
      });
    } */
  }

  deleteInscription(id: any) {
  /*   this.villeService.deleteVille(id).subscribe((res) => {
      this.getVilleData();
    }); */
  }  
}
