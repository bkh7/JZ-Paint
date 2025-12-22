import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultButton } from './components/default-button/default-button';
import { DefaultInput } from './components/default-input/default-input';
import { Room } from './components/room/room';
import { QuoteEditor } from "./components/quote-editor/quote-editor";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultButton, DefaultInput, Room, QuoteEditor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-jz-paint');
}
