import { Component, OnInit } from '@angular/core';
import { Eleve } from '../models/eleve/eleve.model';
import { EleveService } from '../services/eleve/eleve.service';
import { Ville } from '../models/ville/ville.model';
import { VilleService } from '../services/ville/ville.service';
import { InscriptionService } from '../services/inscription/inscription.service';
import { ParentService } from '../services/parent/parent.service';
import { Parent } from '../models/parent/parent.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  villes: Ville[] = [];
  eleves: any[] = [];
  parents: any[] = [];
  parent: Parent = new Parent();
  editingParent: Parent = new Parent();
  selectedCityAddresses: string[] = [];

  constructor(
    private eleveService: EleveService,
    private parentService: ParentService,
    private villeService: VilleService
  ) {}

  ngOnInit(): void {
    this.villeService.villes$.subscribe((villes) => {
      this.villes = villes; // Get the latest villes from the service
    });
    this.villeService.getVilles(); // Fetch villes
    this.getEleves();
    this.getParents();
  }

  getEleves() {
    this.eleveService.getEleves().subscribe((res) => {
      console.log(res);
      this.eleves = res['eleves'];
    });
  }

  getParents() {
    this.parentService.getParents().subscribe((res) => {
      // console.log(res);
      this.parents = res['parents'];
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.parent.image = file || undefined; // Set or reset image
    this.editingParent.image = file || undefined; // Set or reset image
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
    const imageFile: File | null = this.parent.image || null; // This will be File or null

    const selectedEleveIds = this.eleves
      .filter((eleve) => eleve.selected)
      .map((eleve) => eleve.id);

    const parentData = {
      ...this.parent,
      eleve_ids: selectedEleveIds,
    };
    console.log('parentData ', parentData);
    this.parentService.addParent(parentData, imageFile).subscribe(
      (response) => {
        console.log('Parent ajouté avec succès!', response);
        this.resetForm();
        window.location.reload();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de le parent", error);
      }
    );
  }

  resetForm() {
    this.parent = new Parent();
    this.selectedCityAddresses = [];
  }

  // Select a Parent to edit and open the modal
  openEditModalParent(parent: Parent) {
    this.editingParent = { ...parent }; // Make a copy to edit
    this.initializeSelectedEleves();
  }

  initializeSelectedEleves() {
    this.eleves.forEach((eleve) => {
      eleve.checked = false;
    });
    if (this.editingParent.children) {
      this.editingParent.children.forEach((child) => {
        const match = this.eleves.find((e) => e.id === child.id);
        if (match) {
          match.checked = true;
        }
      });
    }
  }

  // Update Parent data on the server
  updateParent() {
    if (this.editingParent) {
      console.log(this.editingParent)
      const selectedEleveIds = this.eleves
        .filter((eleve) => eleve.checked)
        .map((eleve) => eleve.id);

      const editingParentData = {
        ...this.editingParent,
        eleve_ids: selectedEleveIds,
      };

      this.parentService.updateParent(editingParentData).subscribe((res) => {
        this.getParents();
        this.editingParent = new Parent();
        window.location.reload();
      });
    }
  }

  deleteParent(id: any) {
    this.parentService.deleteParent(id).subscribe((res) => {
      this.getParents();
    });
  }
}
