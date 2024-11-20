import { Component, OnInit } from '@angular/core';
import { Eleve } from '../models/eleve/eleve.model';
import { EleveService } from '../services/eleve/eleve.service';
import { Router } from 'express';
import { Ville } from '../models/ville/ville.model';
import { VilleService } from '../services/ville/ville.service';
import { AnneeScolaire } from '../models/annee-scolaire/annee-scolaire.model';
import { Groupe } from '../models/groupe/groupe.model';
import { GroupeService } from '../services/groupe/groupe.service';
import { Inscription } from '../models/inscription/inscription.model';
import { InscriptionService } from '../services/inscription/inscription.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css'],
})
export class EleveComponent implements OnInit {
  villes: Ville[] = [];
  groupes: Groupe[] = [];
  groupe: any;
  eleves: any[] = [];
  eleve: Eleve;
  selectedCityAddresses: string[] = [];
  editingEleve: Eleve = new Eleve();

  constructor(
    private eleveService: EleveService,
    private villeService: VilleService,
    private groupeService: GroupeService,
    private inscriptionService: InscriptionService
  ) {
    this.eleve = new Eleve();
    this.groupe = '';
    this.eleve.image = undefined;
  }

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEleves();
    this.loadGroupes();
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((res) => {
      console.log(res);
      this.eleves = res['eleves'];
    });
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
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.eleve.image = file || undefined; // Set or reset image
    this.editingEleve.image = file || undefined; // Set or reset image
  }

  onCityChange(event: any) {
    const selectedCityId = event.target.value;
    this.fetchAddressesForCity(selectedCityId); // Fetch addresses for the selected city
  }

  fetchAddressesForCity(cityId: string) {
    this.villeService.getAddressesByCityId(cityId).subscribe(
      (addresses: string[]) => {
        this.selectedCityAddresses = addresses || [];
        console.log(
          '  this.selectedCityAddresses ',
          this.selectedCityAddresses
        );
      },
      (error) => {
        console.error('Error fetching addresses:', error);
        this.selectedCityAddresses = []; // Clear addresses in case of error
      }
    );
  }

  onSubmit() {
    const imageFile: File | null = this.eleve.image || null; // This will be File or null

    this.eleveService.addEleve(this.eleve, imageFile).subscribe(
      (response) => {
        console.log('Élève ajouté avec succès!', response);
        this.resetForm();
        window.location.reload();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'élève", error);
      }
    );
  }

  resetForm() {
    this.eleve = new Eleve(); // Create a new instance of Eleve
    this.selectedCityAddresses = []; // Clear selected addresses when resetting the form
  }

  // Select a ville to edit and open the modal
  openInscriptionModal(eleve: Eleve) {
    this.eleve = { ...eleve }; // Make a copy to edit
  }

  inscriptionEleve() {
    this.inscriptionService
      .createInscription({ groupe_id: this.groupe, eleve_id: this.eleve.id })
      .subscribe((res) => {
        window.location.reload();
      });
  }

    // Select a Eleve to edit and open the modal
    openEditModalEleve(eleve: Eleve) {
      this.editingEleve = { ...eleve }; // Make a copy to edit
    }
  
    // Update Eleve data on the server
    updateEleve() {
      if (this.editingEleve) {
        this.eleveService
          .updateEleve(this.editingEleve)
          .subscribe((res) => {
            this.getEleves();
            this.editingEleve = new Eleve();
            window.location.reload();
          });
      }
    }
  
    deleteEleve(id: any) {
      this.eleveService.deleteEleve(id).subscribe((res) => {
        this.getEleves();
      });
    }
}
