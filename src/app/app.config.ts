import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {  provideMarkdown } from 'ngx-markdown';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([BrowserAnimationsModule]),
    provideMarkdown({
      markedOptions: {
        provide: 'MARKED_OPTIONS',
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
  ],
};
