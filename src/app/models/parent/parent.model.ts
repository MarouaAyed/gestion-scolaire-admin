import { Eleve } from "../eleve/eleve.model";

export class Parent {
  id?: number;
  code?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  dateNaissance?: Date; // Change 'date' to 'Date'
  telMobile?: number;
  genre?: string;
  ville_id?: number;
  address?: string;
  adresse_id?: number;
  image?: File;
  codePostal?: number;
  numeroIdentification?: number;

  children?: Eleve[]; 
}
