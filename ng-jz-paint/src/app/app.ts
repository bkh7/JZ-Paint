import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultButton } from './components/default-button/default-button';
import { DefaultInput } from './components/default-input/default-input';
import { Room } from './components/room/room';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultButton, DefaultInput, Room],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-jz-paint');
}
