import { NiveauScolaire } from "../niveau-scolaire/niveau-scolaire.model";
import { Semestre } from "../semestre/semestre.model";

export class NiveauSemestre {
    id?: number;
    niveau_scolaire_id?: number;
    semestre_id?: number;
    niveau_scolaire?:NiveauScolaire;
    semestre?: Semestre;       
  }