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

  deleteVille(id: any) {
    //console.log(id);
    this.villeService.deleteVille(id).subscribe((res) => {
      //console.log(res);
      this.getVilleData();
    });
  }

  updateVille(id: any): void {
   // this.router.navigate(['/edit-ville', id]);
  }
}
