import { Enseignant } from '../enseignant/enseignant.model';
import { NiveauSemestre } from '../niveau-semestre/niveau-semestre.model';

export class Matiere {
  id?: number;
  nom?: string;
  coefficient?: number;
  enseignant_id?: number;
  niveau_semestre_id?: number;

  enseignant?: Enseignant;

  niveau_semestre?: NiveauSemestre;
}
