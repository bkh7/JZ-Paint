import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { AppStateService } from '../../services/app-state';
import html2pdf from 'html2pdf.js';
import { DefaultButton } from '../default-button/default-button';
import { BackButton } from '../back-button/back-button';
import { RoomInterface } from '../../interfaces/room-interface';

@Component({
  selector: 'quote-pdf',
  imports: [CommonModule, DefaultButton, BackButton],
  templateUrl: './quote-pdf.html',
  styleUrl: './quote-pdf.scss',
})
export class QuotePdf implements OnInit {

  quoteData: any;
  settingsData: any;

  constructor(private firestore: Firestore, public appState: AppStateService) { }

  ngOnInit() {
    const documentId = this.appState.currentQuoteId();
    if (true) {
      const quoteDoc = doc(this.firestore, `quotes/${documentId}`);
      docData(quoteDoc).subscribe(data => {
        this.quoteData = data;
      });
    }
    if (true) {
      const settingsDoc = doc(this.firestore, `settings/appSettings`);
      docData(settingsDoc).subscribe(settingsData => {
        this.settingsData = settingsData;
      });
    }
  }

downloadPdf() {
  const element = document.querySelector('.pdf') as HTMLElement;
  if (element) {
    element.classList.add('pdf-export'); // Add the class to disable mobile styles
    const opt = {
      margin:       [0, 0, 0, 0],
      filename:     `Quote for ${this.quoteData?.quoteName || 'quote'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    } as any;
    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('pdf-export'); // Remove the class after export
    });
  }
}

editQuote() {

  this.appState.currentView.set('quote-editor');

}

getPaintedParts(room: RoomInterface): string[] {
  const parts: string[] = [];
  // Walls: check length, width, and height
  if (
    room.wallLength && +room.wallLength > 0 &&
    room.wallWidth && +room.wallWidth > 0 &&
    room.wallHeight && +room.wallHeight > 0
  ) {
    parts.push('walls');
  }
  // Ceiling: check length and width
  if (
    room.ceilingLength && +room.ceilingLength > 0 &&
    room.ceilingWidth && +room.ceilingWidth > 0
  ) {
    parts.push('ceiling');
  }
  // Trim: check length and width
  if (
    room.trimLength && +room.trimLength > 0 &&
    room.trimWidth && +room.trimWidth > 0
  ) {
    parts.push('trim');
  }
  // Door faces
  if (room.numDoorFaces && +room.numDoorFaces > 0) {
    parts.push(`${room.numDoorFaces} door face${+room.numDoorFaces > 1 ? 's' : ''}`);
  }
  // Door frames
  if (room.numDoorFrames && +room.numDoorFrames > 0) {
    parts.push(`${room.numDoorFrames} door frame${+room.numDoorFrames > 1 ? 's' : ''}`);
  }
  // Window frames
  if (room.numWindowFrames && +room.numWindowFrames > 0) {
    parts.push(`${room.numWindowFrames} window frame${+room.numWindowFrames > 1 ? 's' : ''}`);
  }
  return parts;
}

}
