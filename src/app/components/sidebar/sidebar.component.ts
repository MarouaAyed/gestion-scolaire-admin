import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path?: string;
  title?: string;
  icon?: string;
  class?: string;
  items?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'business_chart-bar-32',
    class: '',
  },
  {
    title: "Infrastructure de l'École",
    icon: 'business_bank',
    items: [
      { path: '/salle', title: 'Salle', icon: 'location_bookmark' },
      {
        path: '/niveau-scolaire',
        title: 'Niveaux Scolaire',
        icon: 'design_bullet-list-67',
      },
      {
        path: '/annee-scolaire',
        title: 'Annee Scolaire',
        icon: 'design_bullet-list-67',
      },
    ],
  },
  {
    title: 'Gestion des Utilisateurs',
    icon: 'users_single-02',
    items: [
      { path: '/eleve', title: 'Élèves', icon: 'education_hat' },
      {
        path: '/enseignant',
        title: 'Enseignants',
        icon: 'business_badge',
      },
      { path: '/parent', title: 'Parents', icon: 'users_circle-08' },
      { path: '/ville', title: 'Ville', icon: 'objects_globe', class: '' },
      {
        path: '/role',
        title: 'Role',
        icon: 'business_chart-bar-32',
        class: '',
      },
    ],
  },
  {
    title: "Gestion d'année",
    icon: 'users_single-02',
    items: [
      {
        path: '/semestre',
        title: 'Semestre',
        icon: 'design_bullet-list-67',
      },
      { path: '/matiere', title: 'Matières', icon: 'files_single-copy-04' },
      { path: '/groupe', title: 'Groupe', icon: 'files_single-copy-04' },
      {
        path: '/inscription',
        title: 'Inscription',
        icon: 'files_single-copy-04',
      },
    ],
  },
  {
    title: "Gestion d'emploi",
    icon: 'users_single-02',
    items: [
      {
        path: '/seance',
        title: 'Seance',
        icon: 'files_paper',
      },
      {
        path: '/tranche-horaire',
        title: 'Tranches Horaire',
        icon: 'ui-2_time-alarm',
        class: '',
      },
    ],
  },
  {
    title: 'Suivi des Présences',
    icon: 'education_agenda-bookmark',
    path: '/presence',
  },
  {
    path: '/note',
    title: 'Note',
    icon: 'bi bi-pen',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  expandedMenuIndex: number | null = null; // Track the expanded menu index

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.map((route) => {
      // Create a copy of the route object
      const newRoute = {
        ...route,
        path: route.path ? `/admin${route.path}` : undefined, // Prepend /admin to each top-level path
      };

      // If there are sub-items, map over them and prepend the /admin prefix
      if (newRoute.items) {
        newRoute.items = newRoute.items.map((subItem) => ({
          ...subItem,
          path: subItem.path ? `/admin${subItem.path}` : undefined, // Prepend /admin to each sub-item path
        }));
      }

      return newRoute; // Return the modified route object
    });
  }

  toggleMenu(index: number) {
    this.expandedMenuIndex = this.expandedMenuIndex === index ? -1 : index;
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
