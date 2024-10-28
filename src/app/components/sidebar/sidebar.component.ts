import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
  //{ path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  //{ path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
  { path: '/ecole', title: 'ecole ', icon: 'business_bank', class: '' },
  { path: '/Role', title: 'Role', icon: 'business_chart-bar-32', class: '' },
  { path: '/ville', title: 'ville ', icon: 'objects_globe', class: '' },
  {
    path: '/niveau-scolaire',
    title: 'Niveaux Scolaire',
    icon: 'business_chart-bar-32',
    class: '',
  },
  {
    path: '/tranche-horaire',
    title: 'Tranches Horaire',
    icon: 'business_chart-pie-36',
    class: '',
  },
  { path: '/eleve', title: 'Eleve', icon: 'education_hat', class: '' },
  {
    path: '/utilisateur',
    title: 'Utilisateurs',
    icon: 'users_single-02',
    class: '',
  },
  { path: '/cour', title: 'Cours', icon: 'files_paper', class: '' },

  {
    path: '/recette',
    title: 'recette',
    icon: 'ui-1_settings-gear-63',
    class: '',
  },
  {
    path: '/planification',
    title: 'planification',
    icon: 'ui-1_calendar-60',
    class: '',
  },
  {
    path: '/note',
    title: 'Note',
    icon: 'education_agenda-bookmark',
    class: '',
  },
  { path: '/presence', title: 'présence', icon: 'files_box', class: '' },
  {
    path: '/activites',
    title: 'activités',
    icon: 'tech_controller-modern',
    class: '',
  },
  {
    path: '/discipline',
    title: 'Discipline',
    icon: 'emoticons_satisfied',
    class: '',
  },
  {
    path: '/comptabilité',
    title: 'comptabilité',
    icon: 'files_single-copy-04',
    class: '',
  },
  {
    path: '/facturation_eleve',
    title: 'facturation',
    icon: 'business_money-coins',
    class: '',
  },
  { path: '/cantine', title: 'Cantine', icon: 'shopping_shop', class: '' },
  {
    path: '/ressource',
    title: 'Resources',
    icon: 'ui-1_settings-gear-63',
    class: '',
  },

  //{ path: '/role', title: 'role',  icon:'users_circle-08', class: '' },

  //{ path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  //{ path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  //{ path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.map((route) => ({
      ...route,
      path: `/admin${route.path}`, // Prepend /admin to each path
    }));
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
