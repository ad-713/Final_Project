import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import HttpClient provider
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Enable zone change detection
    provideRouter(routes), // Provide routing configuration
    provideHttpClient(withFetch()), // Provide HttpClient for HTTP requests
    provideClientHydration(withEventReplay()) // Enable client hydration with event replay
  ]
};
