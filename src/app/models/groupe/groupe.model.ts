
import { NiveauSemestre } from '../niveau-semestre/niveau-semestre.model';

export class Groupe {
  id?: number;
  nom?: string;
  designation?: number;
  niveau_semestre_id?: number;

  niveau_semestre?: NiveauSemestre;
}
