import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { AppStateService } from '../../services/app-state';
import html2pdf from 'html2pdf.js';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'quote-pdf',
  imports: [CommonModule, DefaultButton],
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

downloadPdf() {
  const element = document.querySelector('.pdf') as HTMLElement;
  if (element) {
    const opt = {
      margin:       [0, 0, 0, 0],
      filename:     `Quote for ${this.quoteData?.quoteName || 'quote'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    } as any;
    html2pdf().set(opt).from(element).save();
  }
}

}
