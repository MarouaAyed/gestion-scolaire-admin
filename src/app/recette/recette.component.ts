import { Component, OnInit } from '@angular/core';
import { Recette } from '../models/recette/recette.model';
import { Ecole } from '../models/ecole/ecole.model';
import { RecetteService } from '../services/recette/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {

  recettes :any[]=[];
  recette : Recette;
  ecoles: Ecole[] = [];

  constructor(private recetteService:RecetteService,   private router:Router) { 
    this.recette=new Recette();
  }

  ngOnInit(): void {
    this.getRecetteData();
    this.getEcolesData();
    
  }
  getRecetteData(){
    console.log('liste des recettes');
    this.recetteService.getRecettes().subscribe(res =>{

      console.log(res);
      this.ecoles = res['Recettes']; 
    })
  }

  getEcolesData() {
    this.recetteService.getEcoles().subscribe(res => {
      console.log("in getEcolesData ",res);
      this.ecoles = res['Ecoles'];
      console.log('ecoles   ', this.ecoles);
    });
  }

  insertRecette(){
    //console.log('bonjour-insertion-test');

    ///
    console.log('insert    '+JSON.stringify(this.recette) );
    this.recetteService.insertRecette(this.recette).subscribe(res =>{
     
      this.getRecetteData();
    })
  }

  deleteRecette(id:any){
    //console.log(id);
    this.recetteService.deleteRecette(id).subscribe(res =>{
      //console.log(res);
      this.getRecetteData();
    })
  
  }
  updateRecette(id: any): void {
    console.log('update recette ' + id);
    this.router.navigate(['/edit-ecole', id]);
  }
  
}
  

