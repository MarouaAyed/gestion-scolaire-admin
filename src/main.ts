import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { appConfig } from './app/app.config'; // Configuration de l'application
import { AppComponent } from './app/app.component'; // Composant principal
import { environment } from './environments/environment'; // Environnements
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

if (environment.production) {
  enableProdMode(); // Active le mode production
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
}).catch(err => console.error(err));
