import { Component, OnInit } from '@angular/core';
import { Ecole } from '../models/ecole/ecole.model';
import { EcoleService } from '../services/ecole/ecole.service';
import { Router } from '@angular/router';
import { Ville } from '../models/ville/ville.model';

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss'],
})
export class EcoleComponent implements OnInit {
  ecole: Ecole;
  villes: Ville[] = [];

  constructor(private ecoleService: EcoleService) {}

  ngOnInit(): void {
    this.getEcoleData();
    this.getVillesData();
  }

  getEcoleData() {
    this.ecoleService.getEcole().subscribe((res) => {
   //   console.log(res);
      this.ecole = res['Ecole'];
    });
  }

  getVillesData() {
    this.ecoleService.getVilles().subscribe((res) => {
      //  console.log(res);
      this.villes = res['Villes'];
      //  console.log('villes   '+this.villes);
    });
  }

  updateEcole(): void {
    if (this.ecole) {
      this.ecoleService
        .updateEcole(this.ecole)
        .subscribe((res) => {
          window.location.reload();
        });
    }
  }
}
