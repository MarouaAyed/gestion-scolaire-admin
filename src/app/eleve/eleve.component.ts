import { Component, OnInit } from '@angular/core';
import { Eleve } from '../models/eleve/eleve.model';
import { EleveService } from '../services/eleve/eleve.service';
import { Router } from 'express';
import { Ville } from '../models/ville/ville.model';
import { VilleService } from '../services/ville/ville.service';
import { AnneeScolaire } from '../models/annee-scolaire/annee-scolaire.model';
import { Groupe } from '../models/groupe/groupe.model';
import { GroupeService } from '../services/groupe/groupe.service';
import { Inscription } from '../models/inscription/inscription.model';
import { InscriptionService } from '../services/inscription/inscription.service';
import { SemestreService } from '../services/semestre/semestre.service';
import { NoteService } from '../services/note/note.service';
import { Note } from '../models/note/note';
import { Semestre } from '../models/semestre/semestre.model';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css'],
})
export class EleveComponent implements OnInit {
  villes: Ville[] = [];
  groupes: Groupe[] = [];
  groupe: any;
  eleves: any[] = [];
  eleve: Eleve;
  selectedCityAddresses: string[] = [];
  editingEleve: Eleve = new Eleve();

  isBulletinVisible: boolean = false;
  semestres: any[] = [];
  selectedEleve: Eleve = new Eleve();
  selectedSemestre: Semestre | undefined;
  notes: Note[] = [];

  constructor(
    private eleveService: EleveService,
    private villeService: VilleService,
    private groupeService: GroupeService,
    private inscriptionService: InscriptionService,
    private semestreService: SemestreService,
    private noteService: NoteService
  ) {
    this.eleve = new Eleve();
    this.groupe = '';
    this.eleve.image = undefined;
  }

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEleves();
    this.loadGroupes();
    this.loadSemestres();

    const modalElement = document.getElementById('bulletinModel');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        // Réinitialiser les variables lorsque le modal est fermé
        this.selectedSemestre = undefined;
        this.isBulletinVisible = false; // Cacher le bulletin
      });
    }
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((res) => {
      console.log(res);
      this.eleves = res['eleves'];
    });
  }

  loadGroupes(): void {
    this.groupeService.getGroupes().subscribe(
      (data: Groupe[]) => {
        this.groupes = data;
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }

  loadSemestres(): void {
    this.semestreService.getSemestres().subscribe((res) => {
      // console.log(res);
      this.semestres = res;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.eleve.image = file || undefined; // Set or reset image
    this.editingEleve.image = file || undefined; // Set or reset image
  }

  onCityChange(event: any) {
    const selectedCityId = event.target.value;
    this.fetchAddressesForCity(selectedCityId); // Fetch addresses for the selected city
  }

  fetchAddressesForCity(cityId: string) {
    this.villeService.getAddressesByCityId(cityId).subscribe(
      (addresses: string[]) => {
        this.selectedCityAddresses = addresses || [];
        console.log(
          '  this.selectedCityAddresses ',
          this.selectedCityAddresses
        );
      },
      (error) => {
        console.error('Error fetching addresses:', error);
        this.selectedCityAddresses = []; // Clear addresses in case of error
      }
    );
  }

  onSubmit() {
    const imageFile: File | null = this.eleve.image || null; // This will be File or null

    this.eleveService.addEleve(this.eleve, imageFile).subscribe(
      (response) => {
        console.log('Élève ajouté avec succès!', response);
        this.resetForm();
        window.location.reload();
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

  // Select a ville to edit and open the modal
  openInscriptionModal(eleve: Eleve) {
    this.eleve = { ...eleve }; // Make a copy to edit
  }

  inscriptionEleve() {
    this.inscriptionService
      .createInscription({ groupe_id: this.groupe, eleve_id: this.eleve.id })
      .subscribe((res) => {
        window.location.reload();
      });
  }

  // Select a Eleve to edit and open the modal
  openEditModalEleve(eleve: Eleve) {
    this.editingEleve = { ...eleve }; // Make a copy to edit
  }

  // Update Eleve data on the server
  updateEleve() {
    if (this.editingEleve) {
      this.eleveService.updateEleve(this.editingEleve).subscribe((res) => {
        this.getEleves();
        this.editingEleve = new Eleve();
        window.location.reload();
      });
    }
  }

  deleteEleve(id: any) {
    this.eleveService.deleteEleve(id).subscribe((res) => {
      this.getEleves();
    });
  }

  openBulletinModal(eleve: Eleve): void {
    this.selectedEleve = eleve; // Stocker l'élève sélectionné

    console.log(this.selectedEleve)
    this.notes = this.notes.filter(note => note !== undefined);
  }

  // Charger les notes pour l'élève et le semestre sélectionnés
  loadNotes(): void {
    // Vérification si selectedSemestre et selectedEleve sont définis avant d'appeler l'API
    if (this.selectedEleve && this.selectedSemestre !== undefined) {
      console.log(this.selectedSemestre)
      this.noteService
        .getNotesBySemestreForEleve(this.selectedEleve, this.selectedSemestre)
        .subscribe(
          (data) => {
            this.notes = data;

            this.isBulletinVisible = true;          },
          (error) => {
            console.error('Erreur lors du chargement des notes', error);
          }
        );
    } else {
      this.isBulletinVisible = false;
      console.error('Élève ou semestre non sélectionné');
    }
  }


  calculateAverage(notes: any[]): number {
    const totalNotes = notes.reduce((sum, note) => sum + note.note, 0);
    return totalNotes / notes.length;
  }
  
  getRemarks(average: number): string {
    if (average >= 16) {
      return 'Très bien, continuez ainsi !';
    } else if (average >= 12) {
      return 'Bien, mais peut mieux faire.';
    } else if (average >= 10) {
      return 'Assez bien, des efforts sont nécessaires.';
    } else {
      return 'Insuffisant, il faut redoubler d’efforts.';
    }
  }
  
  
}
