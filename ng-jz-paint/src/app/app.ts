import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultButton } from './components/default-button/default-button';
import { DefaultInput } from './components/default-input/default-input';
import { Room } from './components/room/room';
import { QuoteEditor } from "./components/quote-editor/quote-editor";
import { AppStateService } from './services/app-state';
import { CommonModule } from '@angular/common';
import { QuotesView } from './components/quotes-view/quotes-view';
import { VerifyDeleteModal } from './components/verify-delete-modal/verify-delete-modal';
import { QuotePdf } from './components/quote-pdf/quote-pdf';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuoteEditor, CommonModule, QuotesView,  QuotePdf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('ng-jz-paint');

  constructor(public appState: AppStateService) {}

  ngOnInit() {
    this.appState.currentView.set('quotes-list');
    console.log('App initialized, current view set to quote-pdf');
  }
}
