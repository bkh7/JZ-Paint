import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  // Example state signals
  currentView = signal<'menu' | 'quotes-list' | 'quote-editor'>('menu');
  currentQuoteId = signal<string | null>(null);
  quoteTitleEditable = signal<boolean>(false);
}