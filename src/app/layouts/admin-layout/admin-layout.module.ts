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
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NiveauScolaireComponent } from '../../niveau-scolaire/niveau-scolaire.component';
import { TrancheHoraireComponent } from '../../tranche-horaire/tranche-horaire.component';
import { RoleComponent } from '../../role/role.component';
import { EleveComponent } from '../../eleve/eleve.component';
import { EcoleComponent } from '../../ecole/ecole.component';
import { UtilisateurComponent } from '../../utilisateur/utilisateur.component';
import { CourComponent } from '../../cour/cour.component';
import { EditRoleComponent } from '../../edit-role/edit-role.component';
import { EditNiveauScolaireComponent } from '../../edit-niveau-scolaire/edit-niveau-scolaire.component';
import { EditTrancheHoraireComponent } from '../../edit-tranche-horaire/edit-tranche-horaire.component';
import { VilleComponent } from '../../ville/ville.component';
import { EditVilleComponent } from '../../edit-ville/edit-ville.component';
import { EditEcoleComponent } from '../../edit-ecole/edit-ecole.component';
import { RecetteComponent } from '../../recette/recette.component';
// Other component imports...

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgChartjsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    SidebarComponent, 
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    NiveauScolaireComponent,
    TrancheHoraireComponent,
    RoleComponent,
    EleveComponent,
    EcoleComponent,
    UtilisateurComponent,
    CourComponent, 
    EditRoleComponent,
    EditNiveauScolaireComponent,
    EditTrancheHoraireComponent,
    VilleComponent,
    EditVilleComponent,
    EditEcoleComponent,
    RecetteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
