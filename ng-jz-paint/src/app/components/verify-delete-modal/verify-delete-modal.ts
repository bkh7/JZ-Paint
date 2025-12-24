import { Component, Output, EventEmitter } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { AppStateService } from '../../services/app-state';


@Component({
  selector: 'verify-delete-modal',
  imports: [DefaultButton],
  templateUrl: './verify-delete-modal.html',
  styleUrl: './verify-delete-modal.scss',
})
export class VerifyDeleteModal {
  @Output() confirmDelete = new EventEmitter<void>();

  constructor(public appState: AppStateService) {}

  onDelete() {
    this.confirmDelete.emit();
  }
  onCancel(){
    this.appState.deleteModalVisible.set(false);
  }
}
