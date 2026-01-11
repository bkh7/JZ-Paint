import { Component } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'warning-modal',
  imports: [DefaultButton],
  templateUrl: './warning-modal.html',
  styleUrl: './warning-modal.scss',
})
export class WarningModal {
  constructor(private appState: AppStateService) {}

  onUnderstood(){
    this.appState.warningModalVisible.set(false);
  }
}
