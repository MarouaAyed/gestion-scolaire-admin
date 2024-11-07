import { Component, OnInit } from '@angular/core';
import { Salle } from '../models/salle/salle.model';
import { SalleService } from '../services/salle/salle.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salle',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.css',
})
export class SalleComponent implements OnInit {
  salles: any[] = [];
  salle: Salle;
  editingSalle: Salle = new Salle(); 

  constructor(private salleService: SalleService, private router: Router) {
    this.salle = new Salle();
  }

  ngOnInit(): void {
    this.getSalleData();
  }
  getSalleData() {
    this.salleService.getSalles().subscribe((res) => {
      this.salles = res['salles'];
    });
  }

  insertSalle() {
    this.salleService.insertSalle(this.salle).subscribe((res) => {
      this.salles.push(res);
      this.salle = new Salle();
    });
  }

  deleteSalle(id: any) {
    this.salleService.deleteSalle(id).subscribe((res) => {
      this.getSalleData();
    });
  }

    // Select a salle to edit and open the modal
  openEditModal(salle: Salle) {
    this.editingSalle = { ...salle }; // Make a copy to edit
  }

  // Update salle data on the server
  updateSalle() {
    if (this.editingSalle) {
      this.salleService.updateSalle(this.editingSalle).subscribe((res) => {
        this.getSalleData();
        this.editingSalle = new Salle();
      });
    }
  }
}
