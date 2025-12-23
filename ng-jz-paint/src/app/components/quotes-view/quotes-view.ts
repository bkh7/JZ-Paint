import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'quotes-view',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './quotes-view.html',
  styleUrl: './quotes-view.scss',
})
export class QuotesView {

  quotes$: Observable<any[]>;
  constructor(private firestore: Firestore, private appState: AppStateService) {
    const quotesCollection = collection(this.firestore, 'quotes');
    this.quotes$ = collectionData(quotesCollection, { idField: 'id' });
  }

  cardClicked(quoteId: string){

    this.appState.currentView.set('quote-editor');
    this.appState.currentQuoteId.set(quoteId);

  }

}
