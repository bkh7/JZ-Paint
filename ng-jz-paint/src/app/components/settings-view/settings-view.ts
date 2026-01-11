import { Component } from '@angular/core';
import { BackButton } from '../back-button/back-button';
import { DefaultInput } from '../default-input/default-input';
import { SettingsInterface } from '../../interfaces/settings-interface';
import { DefaultButton } from '../default-button/default-button';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'settings-view',
  imports: [BackButton, DefaultInput, DefaultButton],
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.scss',
})
export class SettingsView implements OnInit {
  settings: SettingsInterface = {
    wallPricePerSqft: '',
    ceilingPricePerSqft: '',
    trimPricePerSqft: '',
    pricePerDoorFace: '',
    pricePerDoorFrame: '',
    pricePerWindowFrame: '',
    timeToPaymentDue: '',
    percentageLateFee: '',
    paymentStatusID: ''
  };

  constructor(private firestore: Firestore, private appState: AppStateService) { }

  async saveSettings() {
    const settingsDoc = doc(this.firestore, `settings/appSettings`);
    const paymentStatusID = Object.values(this.settings)
      .map(val => String(val).trim())
      .join('');

    this.settings.paymentStatusID = paymentStatusID;
    await setDoc(settingsDoc, this.settings);

    this.appState.currentView.set('quotes-list');
  }
  async ngOnInit() {
    // Load existing settings from Firestore if needed

    const quoteRef = doc(this.firestore, 'settings', 'appSettings');
    const quoteSnap = await getDoc(quoteRef); //get current quote document

    if (quoteSnap.exists()) {
      const data = quoteSnap.data() as SettingsInterface; //cast data from firestore to SettingsInterface
      this.settings.wallPricePerSqft = data.wallPricePerSqft;
      this.settings.ceilingPricePerSqft = data.ceilingPricePerSqft;
      this.settings.trimPricePerSqft = data.trimPricePerSqft;
      this.settings.pricePerDoorFace = data.pricePerDoorFace;
      this.settings.pricePerDoorFrame = data.pricePerDoorFrame;
      this.settings.pricePerWindowFrame = data.pricePerWindowFrame;
      this.settings.timeToPaymentDue = data.timeToPaymentDue;
      this.settings.percentageLateFee = data.percentageLateFee;
      this.settings.paymentStatusID = data.paymentStatusID;
    }
  }
}
