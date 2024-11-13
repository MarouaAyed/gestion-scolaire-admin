import { Eleve } from "../eleve/eleve.model";
import { Groupe } from "../groupe/groupe.model";

export class Inscription {
    id?: number;
    code?: number;
    eleve_id?: number;
    eleve?:Eleve;
    groupe_id?: number;
    groupe?:Groupe
}
