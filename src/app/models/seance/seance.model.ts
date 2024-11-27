import { Groupe } from '../groupe/groupe.model';
import { Matiere } from '../matiere/matiere.model';
import { Salle } from '../salle/salle.model';
import { TrancheHoraire } from '../tranche-horaire/tranche-horaire.model';

export class Seance {
  id?: number;
  matiere_id?: number;
  salle_id?: number;
  tranche_horaire_id?: number;
  groupe_id?: number;
  day?: string;

  // Relationships
  matiere?: Matiere;
  salle?: Salle;
  trancheHoraire?: TrancheHoraire;
  groupe?: Groupe;

  presencesEleves?: Array<{eleve: any, present: boolean, seance_id: number}>;
  presenceEnseignant?: {enseignant: any, present: boolean};
}
