import { Component, OnInit } from '@angular/core';
import { NiveauScolaire } from '../models/niveau-scolaire/niveau-scolaire.model';
import { Router } from '@angular/router';
import { NiveauScolaireService } from '../services/niveau-scolaire/niveau-scolaire.service';

@Component({
  selector: 'app-niveau-scolaire',
  templateUrl: './niveau-scolaire.component.html',
  styleUrls: ['./niveau-scolaire.component.scss']
})
export class NiveauScolaireComponent implements OnInit {

  niveauxScolaires: any[] = [];
  //niveauxScolaires:any;
  niveauScolaire: NiveauScolaire;
  
  //niveauScolaire=new NiveauScolaire();

 // niveauScolaire: any = {
  //  code: 12345 // initialisez la valeur ici
 // };
  constructor(private niveauScolaireService:NiveauScolaireService,   private router:Router) { 
    this.niveauScolaire = new NiveauScolaire();
  }

  ngOnInit(): void {
 
    this.getNiveauScolaireData();
  }
 
  getNiveauScolaireData(){
    console.log('liste des Niveau Scolaire');
    this.niveauScolaireService.getNiveauxScolaires().subscribe(res =>{

      console.log(res);
      this.niveauxScolaires = res['niveauxScolaires']; 
    })
  }
  /*
 
  insertTrancheHoraire(){
    //console.log('bonjour-insertion-test');
    //console.log(this.product);


    this.tranchehoraireService.insertTrancheHoraire(this.tranchehoraire).subscribe(res =>{
      console.log(res);
     // this.getProductData();
    })
  } */
    insertNiveauScolaire(){
      //console.log('bonjour-insertion-test');
      //console.log(this.product);
      this.niveauScolaireService.insertNiveauxScolaires(this.niveauScolaire).subscribe(res =>{
        console.log(res);
       // this.getProductData();
       this.niveauxScolaires.push(res);
      // Réinitialiser le formulaire
      this.niveauScolaire = new NiveauScolaire();
      })
    }
  



deleteNiveauScolaire(id:any){
  //console.log(id);
  this.niveauScolaireService.deleteNiveauxScolaires(id).subscribe(res =>{
    //console.log(res);
    this.getNiveauScolaireData();
  })

}


updateNiveauxScolaires(id:any): void {
  this.router.navigate(['/edit-niveau-scolaire', id]);
}
}

