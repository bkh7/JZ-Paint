import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  // Example state signals
  currentView = signal<'menu' | 'quotes-list' | 'quote-editor'>('menu');
  // Add more state as needed
}