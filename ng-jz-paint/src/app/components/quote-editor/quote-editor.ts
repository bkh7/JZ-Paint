import { Component } from '@angular/core';
import { DefaultInput } from '../default-input/default-input';
import { Room } from '../room/room';
import { DefaultButton } from "../default-button/default-button";

@Component({
  selector: 'quote-editor',
  imports: [DefaultInput, Room, DefaultButton],
  templateUrl: './quote-editor.html',
  styleUrl: './quote-editor.scss',
})
export class QuoteEditor {

  quoteName: string = '';

}
