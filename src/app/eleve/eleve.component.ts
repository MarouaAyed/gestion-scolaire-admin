import { Component, OnInit } from '@angular/core';
import { Eleve } from '../models/eleve/eleve.model';
import { EleveService } from '../services/eleve/eleve.service';
import { Router } from 'express';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css'],
})
export class EleveComponent implements OnInit {
  eleves: any[] = [];
  eleve: Eleve;

  constructor(private eleveService: EleveService) {
    this.eleve = new Eleve();
    this.eleve.image = undefined;
  }

  ngOnInit(): void {
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
  }
}
