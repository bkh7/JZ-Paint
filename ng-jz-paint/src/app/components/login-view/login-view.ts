import { Component } from '@angular/core';
import { AuthService } from '../../services/firebase-auth';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'login-view',
  imports: [FormsModule, DefaultButton],
  templateUrl: './login-view.html',
  styleUrl: './login-view.scss',
})
export class LoginView {
email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private appState: AppStateService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.appState.currentView.set('quotes-list'); },
      error: err => this.error = err.message
    });
  }

  register() {
    this.auth.register(this.email, this.password).subscribe({
      next: () => { /* handle success, e.g. navigate to app */ },
      error: err => this.error = err.message
    });
  }
}
