import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
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



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'niveau-scolaire',        component: NiveauScolaireComponent },
    { path: 'tranche-horaire',        component: TrancheHoraireComponent },
    { path: 'Role',        component: RoleComponent },
    { path: 'eleve',        component: EleveComponent },
    { path:'ecole',         component:EcoleComponent},
    { path:'utilisateur', component:UtilisateurComponent},
    { path:'cour', component:CourComponent},
    { path:'ville', component:VilleComponent},
    { path: 'edit-role/:id', component: EditRoleComponent },
    { path: 'edit-niveau-scolaire/:id', component: EditNiveauScolaireComponent },
    { path: 'edit-tranche-horaire/:id', component: EditTrancheHoraireComponent },
    { path: 'edit-ville/:id', component: EditVilleComponent },
    { path: 'edit-ecole/:id', component: EditEcoleComponent },
    { path: 'recette', component: RecetteComponent}
];
