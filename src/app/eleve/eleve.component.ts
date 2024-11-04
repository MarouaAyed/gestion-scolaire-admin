import { Component, OnInit } from '@angular/core';
import { Eleve } from '../models/eleve/eleve.model';
import { EleveService } from '../services/eleve/eleve.service';
import { Router } from 'express';
import { Ville } from '../models/ville/ville.model';
import { VilleComponent } from '../ville/ville.component';
import { VilleService } from '../services/ville/ville.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css'],
})
export class EleveComponent implements OnInit {
  villes: Ville[] = [];
  eleves: any[] = [];
  eleve: Eleve;
  selectedCityAddresses: string[] = []; 

  constructor(private eleveService: EleveService, private villeService: VilleService) {
    this.eleve = new Eleve();
    this.eleve.image = undefined;
  }

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEleves();
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((res) => {
      console.log(res);
      this.eleves = res['eleves'];
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.eleve.image = file || undefined; // Set or reset image
  }

  onCityChange(event: any) {
    const selectedCityId = event.target.value;
    this.fetchAddressesForCity(selectedCityId); // Fetch addresses for the selected city
  }

  fetchAddressesForCity(cityId: string) {
    this.villeService.getAddressesByCityId(cityId); // Call the service method
  }

  onSubmit() {
    const imageFile: File | null = this.eleve.image || null; // This will be File or null

    this.eleveService.addEleve(this.eleve, imageFile).subscribe(
      (response) => {
        console.log('Élève ajouté avec succès!', response);
        this.resetForm();
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
}
