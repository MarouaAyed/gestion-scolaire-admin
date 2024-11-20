import { Component, OnInit } from '@angular/core';
import { Inscription } from '../models/inscription/inscription.model';
import { InscriptionService } from '../services/inscription/inscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Groupe } from '../models/groupe/groupe.model';
import { GroupeService } from '../services/groupe/groupe.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent implements OnInit {
  groupes: Groupe[] = [];
  inscriptions: any[] = [];
  inscription: Inscription;
  editingInscription: Inscription = new Inscription();

  constructor(private inscriptionService: InscriptionService, private groupeService: GroupeService,) {
    this.inscription = new Inscription();
  }
  ngOnInit(): void {
    this.getInscriptionData();
    this.loadGroupes()
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
    console.log(this.editingInscription)
  }

  updateInscription() {
    if (this.editingInscription) {
      this.inscriptionService.updateInscription(this.editingInscription).subscribe((res) => {
        this.getInscriptionData();
        this.editingInscription = new Inscription();
        window.location.reload();
      });
    } 
  }

  deleteInscription(id: any) {
     this.inscriptionService.deleteInscription(id).subscribe((res) => {
      this.getInscriptionData();
    }); 
  }  
}
