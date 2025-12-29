import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'quote-pdf',
  imports: [CommonModule],
  templateUrl: './quote-pdf.html',
  styleUrl: './quote-pdf.scss',
})
export class QuotePdf implements OnInit {

  quoteData: any;

  constructor(private firestore: Firestore, public appState: AppStateService) { }

  ngOnInit() {
    const documentId = this.appState.currentQuoteId();
    if (true) {
      const quoteDoc = doc(this.firestore, `quotes/${documentId}`);
      docData(quoteDoc).subscribe(data => {
        this.quoteData = data;
      });
    }
  }
}
