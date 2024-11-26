import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/auth/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: any;
  userProfile: any;
  loading: boolean = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log('test')
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password_confirmation: [''],
    });

    this.loadProfile();
  }

  // Charger les informations du profil
  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.profileForm.patchValue({
          name: this.userProfile.name,
          email: this.userProfile.email
        });
      },
      (error) => {
       console.log('Erreur de récupération du profil');
      }
    );
  }
  
  

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;  // Ne soumet pas si le formulaire est invalide
    }
  
    // Extraire les données du formulaire
    const profileData = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
      password_confirmation: this.profileForm.value.password_confirmation
    };
  
    // Déclenche le chargement pour l'UI
    this.loading = true;
  
    // Appelez votre service pour mettre à jour le profil
    this.profileService.updateProfile(profileData).subscribe(
      (data) => {
        console.log('Profil mis à jour avec succès');
        this.loadProfile();  // Rechargez les informations du profil
        this.loading = false;
      },
      (error) => {
        console.log('Erreur lors de la mise à jour du profil', error); // Afficher l'erreur pour plus de détails
        this.loading = false;
      }
    );
  }

  
}
