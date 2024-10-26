import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TrancheHoraireComponent } from './tranche-horaire/tranche-horaire.component';
import { NiveauScolaireComponent } from './niveau-scolaire/niveau-scolaire.component';


export const routes: Routes =[

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  

  {
    path: 'navbar',
    component: NavbarComponent,
  },
  //{
    //path: 'tranche-horaire',
    //component: TrancheHoraireComponent,
  //},
  //{
    //path: 'niveau-scolaire',
    //component: NiveauScolaireComponent,
  //},

  {

    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: 'admin',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
  
];
