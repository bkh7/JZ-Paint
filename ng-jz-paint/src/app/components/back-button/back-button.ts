import { Component } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'back-button',
  imports: [DefaultButton],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  constructor(private appState: AppStateService) { }

  previousView() {
    const prevView = this.appState.previousView();
    this.appState.currentView.set(prevView);
  }

}
