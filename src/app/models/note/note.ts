import { Eleve } from "../eleve/eleve.model";
import { Matiere } from "../matiere/matiere.model";

export class Note {
    id?: number;
    eleve_id?: number;
    matiere_id?: number;
    note: number;

    eleve?: Eleve;
    matiere?: Matiere
  }
  