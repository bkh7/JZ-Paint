import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultButton } from './components/default-button/default-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-jz-paint');
}
