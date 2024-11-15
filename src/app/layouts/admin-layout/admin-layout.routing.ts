import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NiveauScolaireComponent } from '../../niveau-scolaire/niveau-scolaire.component';
import { TrancheHoraireComponent } from '../../tranche-horaire/tranche-horaire.component';
import { RoleComponent } from '../../role/role.component';
import { EleveComponent } from '../../eleve/eleve.component';
import { EcoleComponent } from '../../ecole/ecole.component';
import { VilleComponent } from '../../ville/ville.component';
import { EditEcoleComponent } from '../../edit-ecole/edit-ecole.component';
import { SalleComponent } from '../../salle/salle.component';
import { AnneeScolaireComponent } from '../../annee-scolaire/annee-scolaire.component';
import { SemestreComponent } from '../../semestre/semestre.component';
import { MatiereComponent } from '../../matiere/matiere.component';
import { GroupeComponent } from '../../groupe/groupe.component';
import { InscriptionComponent } from '../../inscription/inscription.component';
import { SeanceComponent } from '../../seance/seance.component';
import { EnseignantComponent } from '../../enseignant/enseignant.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'salle', component: SalleComponent },

  { path: 'user-profile', component: UserProfileComponent },
  { path: 'niveau-scolaire', component: NiveauScolaireComponent },
  { path: 'annee-scolaire', component: AnneeScolaireComponent },
  { path: 'tranche-horaire', component: TrancheHoraireComponent },
  { path: 'role', component: RoleComponent },
  { path: 'eleve', component: EleveComponent },
  { path: 'enseignant', component: EnseignantComponent },
  { path: 'ecole', component: EcoleComponent },
  { path: 'ville', component: VilleComponent },
  { path: 'edit-ecole/:id', component: EditEcoleComponent },
  { path: 'semestre', component: SemestreComponent },
  { path: 'matiere', component: MatiereComponent },
  { path: 'groupe', component: GroupeComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'seance', component: SeanceComponent },
];
