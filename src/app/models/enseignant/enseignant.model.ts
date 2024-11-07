export class Enseignant {
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
    image?: File;
    codePostal?: number;
    numeroIdentification?: number;
}
