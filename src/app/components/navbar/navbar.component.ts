import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private listTitles!: any[]; // Utiliser le "definite assignment assertion"
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    const html = document.getElementsByTagName('html')[0];
    let $layer: HTMLElement | undefined; // Declare $layer here

    if (this.mobile_menu_visible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }

    // Handle menu visibility
    if (this.mobile_menu_visible === 1) {
        html.classList.remove('nav-open');
        // Check if $layer is defined before using it
        if ($layer) {
            $layer.remove();
        }
        setTimeout(() => {
            $toggle.classList.remove('toggled');
        }, 400);
    } else {
        // Initialize $layer here
        $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        // Append $layer to the appropriate parent
        if (html.querySelectorAll('.main-panel').length > 0) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        } else if (html.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(() => {
            if ($layer) {
                $layer.classList.add('visible'); // Ensure $layer is defined before adding class
            }
        }, 100);

        $layer.onclick = () => {
            html.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            if ($layer) {
                // Check if $layer is defined before using it
                $layer.classList.remove('visible');
                setTimeout(() => {
                    if ($layer) {
                        $layer.remove(); // Ensure $layer is defined before removing it
                        $toggle.classList.remove('toggled');
                    }
                }, 400);
            }
        };

        html.classList.add('nav-open');
        this.mobile_menu_visible = 1;
    }
}

  getTitle() {
    let titlee =
      this.location.prepareExternalUrl(this.location.path()) || 'default'; // Valeur par défaut
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop() || 'default'; // Assurez-vous que titlee n'est pas undefined

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    //  return 'Dashboard'; // Valeur par défaut
  }
}
