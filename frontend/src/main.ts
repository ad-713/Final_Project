import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {importProvidersFrom} from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(AgGridModule)
  ]
}).catch(err => console.error(err));
