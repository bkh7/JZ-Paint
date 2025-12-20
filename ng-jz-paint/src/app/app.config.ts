import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "jz-paint", appId: "1:179701375254:web:5eb8eacd86aab037ddf037", storageBucket: "jz-paint.firebasestorage.app", apiKey: "AIzaSyA2QJUZtJ2D36m4ONVRkxSWDuIpgjDD0N8", authDomain: "jz-paint.firebaseapp.com", messagingSenderId: "179701375254", projectNumber: "179701375254", version: "2" })), provideFirestore(() => getFirestore())
  ]
};
