import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgChartjsModule } from 'ng-chartjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// Import components
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ComponentsModule } from '../../components/components.module';
import { EcoleComponent } from '../../ecole/ecole.component';
import { RoleComponent } from '../../role/role.component';
import { VilleComponent } from '../../ville/ville.component';
import { NiveauScolaireComponent } from '../../niveau-scolaire/niveau-scolaire.component';
import { TrancheHoraireComponent } from '../../tranche-horaire/tranche-horaire.component';
import { EleveComponent } from '../../eleve/eleve.component';
import { AnneeScolaireComponent } from '../../annee-scolaire/annee-scolaire.component';
import { SemestreComponent } from '../../semestre/semestre.component';
import { MatiereComponent } from '../../matiere/matiere.component';
import { EnseignantComponent } from '../../enseignant/enseignant.component';
// Other component imports...

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    RouterModule,
    ComponentsModule,
    FormsModule,
    NgChartjsModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    EcoleComponent,
    RoleComponent,
    VilleComponent,
    NiveauScolaireComponent,
    TrancheHoraireComponent,
    EleveComponent,
    AnneeScolaireComponent,
    EnseignantComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
