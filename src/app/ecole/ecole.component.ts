import { Component, OnInit } from '@angular/core';
import { Ecole } from '../models/ecole/ecole.model';
import { EcoleService } from '../services/ecole/ecole.service';
import { Router } from '@angular/router';
import { Ville } from '../models/ville/ville.model';

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit {

  ecoles :any[]=[];
  ecole : Ecole;
  villes: Ville[] = [];

  constructor(private ecoleService:EcoleService,   private router:Router) { 
    this.ecole=new Ecole();
  }

  ngOnInit(): void {
    this.getEleveData();
    this.getVillesData();
  }

  getEleveData(){
   // console.log('liste des ecoles');
    this.ecoleService.getEcoles().subscribe(res =>{

    //  console.log(res);
      this.ecoles = res['Ecoles']; 
    })
  }

  getVillesData() {
    this.ecoleService.getVilles().subscribe(res => {
    //  console.log(res);
      this.villes = res['Villes'];
    //  console.log('villes   '+this.villes);
    });
  }


  insertEcole(){
    //console.log('bonjour-insertion-test');

    ///
    console.log('insert    '+JSON.stringify(this.ecole) );
    this.ecoleService.insertEcole(this.ecole).subscribe(res =>{
     
      this.getEleveData();
    })
  }
  deleteEcole(id:any){
    //console.log(id);
    this.ecoleService.deleteEcole(id).subscribe(res =>{
      //console.log(res);
      this.getEleveData();
    })
  
  }
 updateEcole(id:any): void {
  console.log('update ecole'+id);
    this.router.navigate(['/edit-ecole', id]);}
}


