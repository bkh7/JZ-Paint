import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultButton } from './components/default-button/default-button';
import { DefaultInput } from './components/default-input/default-input';
import { Room } from './components/room/room';
import { QuoteEditor } from "./components/quote-editor/quote-editor";
import { AppStateService } from './services/app-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultButton, DefaultInput, Room, QuoteEditor, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('ng-jz-paint');

  constructor(public appState: AppStateService) {}

  ngOnInit() {
    this.appState.currentView.set('quote-editor');
    console.log('App initialized, current view set to menu');
  }
}
