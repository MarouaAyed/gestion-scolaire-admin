import { Component, OnInit } from '@angular/core';
import { Ville } from '../models/ville/ville.model';
import { VilleService } from '../services/ville/ville.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss'],
})
export class VilleComponent implements OnInit {
  Villes: any[] = [];
  ville: Ville;
  editingVille: Ville = new Ville();

  constructor(private villeService: VilleService, private router: Router) {
    this.ville = new Ville();
  }
  ngOnInit(): void {
    this.getVilleData();
  }
  getVilleData() {
    console.log('liste des villes');
    this.villeService.getVilles();
    this.villeService.villes$.subscribe((villes) => {
      this.Villes = villes;
    });
  }

  insertVille() {
    //console.log('bonjour-insertion-test');
    //console.log(this.product);
    this.villeService.insertVille(this.ville).subscribe((res) => {
      console.log(res);
      //   this.Villes = res['Villes'];
      this.Villes.push(res);
      this.ville = new Ville();
      // this.getProductData();
    });
  }

  // Select a ville to edit and open the modal
  openEditVilleModal(ville: Ville) {
    this.editingVille = { ...ville }; // Make a copy to edit
  }

  // Update Ville data on the server
  updateVille() {
    if (this.editingVille) {
      this.villeService.updateVille(this.editingVille).subscribe((res) => {
        this.getVilleData();
        this.editingVille = new Ville();
      });
    }
  }

  deleteVille(id: any) {
    this.villeService.deleteVille(id).subscribe((res) => {
      this.getVilleData();
    });
  }
}
