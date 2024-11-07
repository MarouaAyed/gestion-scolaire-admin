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

  constructor(private enseignantService: EnseignantService, private villeService: VilleService) {
    this.enseignant = new Enseignant();
    this.enseignant.image = undefined;
  }

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEleves();
  }

  getEleves() {
    this.enseignantService.getEnseignants().subscribe((res) => {
      console.log(res);
      this.enseignants = res['enseignants'];
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
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'élève", error);
      }
    );
  }

  resetForm() {
    this.enseignant = new Enseignant(); 
    this.selectedCityAddresses = [];
  }
}
