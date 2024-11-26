import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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
import { EnseignantComponent } from '../../enseignant/enseignant.component';
import { ParentComponent } from '../../parent/parent.component';
// Other component imports...

import { NgChartsModule } from 'ng2-charts';
import { ProfileComponent } from '../../profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    RouterModule,
    ComponentsModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgChartsModule
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ProfileComponent,
    EcoleComponent,
    RoleComponent,
    VilleComponent,
    NiveauScolaireComponent,
    TrancheHoraireComponent,
    EleveComponent,
    ParentComponent,
    AnneeScolaireComponent,
    EnseignantComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
