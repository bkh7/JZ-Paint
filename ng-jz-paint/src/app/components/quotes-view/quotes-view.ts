import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'quotes-view',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './quotes-view.html',
  styleUrl: './quotes-view.scss',
})
export class QuotesView {

  quotes$: Observable<any[]>;
  constructor(private firestore: Firestore) {
    const quotesCollection = collection(this.firestore, 'quotes');
    this.quotes$ = collectionData(quotesCollection);
  }

}
