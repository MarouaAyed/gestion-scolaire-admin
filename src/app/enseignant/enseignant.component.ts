import { Component, OnInit } from '@angular/core';
import { Enseignant } from '../models/enseignant/enseignant.model';
import { EnseignantService } from '../services/enseignant/enseignant.service';
import { Router } from 'express';
import { Ville } from '../models/ville/ville.model';
import { VilleComponent } from '../ville/ville.component';
import { VilleService } from '../services/ville/ville.service';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css'],
})
export class EnseignantComponent implements OnInit {
  villes: Ville[] = [];
  enseignants: any[] = [];
  enseignant: Enseignant;
  selectedCityAddresses: string[] = [];
  editingEnseignant: Enseignant = new Enseignant();

  constructor(
    private enseignantService: EnseignantService,
    private villeService: VilleService
  ) {
    this.enseignant = new Enseignant();
    this.enseignant.image = undefined;
  }

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEnseignants();
  }

  getEnseignants() {
    this.enseignantService.getEnseignants().subscribe((res) => {
      this.enseignants = res;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.enseignant.image = file || undefined; // Set or reset image
  }

  onCityChange(event: any) {
    const selectedCityId = event.target.value;
    this.fetchAddressesForCity(selectedCityId); // Fetch addresses for the selected city
  }

  fetchAddressesForCity(cityId: string) {
    this.villeService.getAddressesByCityId(cityId); // Call the service method
  }

  onSubmit() {
    const imageFile: File | null = this.enseignant.image || null; // This will be File or null

    this.enseignantService.addEnseignant(this.enseignant, imageFile).subscribe(
      (response) => {
        console.log('Enseignant ajouté avec succès!', response);
        this.resetForm();
        window.location.reload();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'Enseignant", error);
      }
    );
  }

  resetForm() {
    this.enseignant = new Enseignant();
    this.selectedCityAddresses = [];
  }

  // Select a Enseignant to edit and open the modal
  openEditModalEnseignant(enseignant: Enseignant) {
    this.editingEnseignant = { ...enseignant }; // Make a copy to edit
  }

  // Update Enseignant data on the server
  updateEnseignant() {
    if (this.editingEnseignant) {
      this.enseignantService.updateEnseignant(this.editingEnseignant).subscribe((res) => {
        this.getEnseignants();
        this.editingEnseignant = new Enseignant();
        window.location.reload();
      });
    }
  }

  deleteEnseignant(id: any) {
    this.enseignantService.deleteEnseignant(id).subscribe((res) => {
      this.getEnseignants();
    });
  }
}
