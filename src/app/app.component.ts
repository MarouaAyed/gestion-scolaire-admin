import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Adjust the path as necessary

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, NavbarComponent] // Add NavbarComponent here
})
export class AppComponent {}
