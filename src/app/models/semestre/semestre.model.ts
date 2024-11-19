import { NiveauScolaire } from "../niveau-scolaire/niveau-scolaire.model";
import { NiveauSemestre } from "../niveau-semestre/niveau-semestre.model";

export class Semestre {
    id?: number; 
    name?: string;
    start_date?: string; 
    end_date?: string; 
    annee_scolaire_id?: number; 
    niveau_semestres?: NiveauSemestre[]; 
  }
  