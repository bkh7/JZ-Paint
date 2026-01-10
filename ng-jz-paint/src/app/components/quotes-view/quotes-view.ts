import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'quotes-view',
  imports: [AsyncPipe, CommonModule, DefaultButton],
  templateUrl: './quotes-view.html',
  styleUrl: './quotes-view.scss',
})
export class QuotesView {

  quotes$: Observable<any[]>;
  constructor(private firestore: Firestore, private appState: AppStateService) {
    const quotesCollection = collection(this.firestore, 'quotes');
    this.quotes$ = collectionData(quotesCollection, { idField: 'id' });
  }

  handleExistingClick(quoteId: string){

    this.appState.previousView.set(this.appState.currentView());
    this.appState.currentView.set('quote-pdf');
    this.appState.currentQuoteId.set(quoteId);

  }

   handleNewClick(quoteId: string){

    this.appState.previousView.set(this.appState.currentView());
    this.appState.currentView.set('quote-editor');
    this.appState.currentQuoteId.set(quoteId);

  }

}
