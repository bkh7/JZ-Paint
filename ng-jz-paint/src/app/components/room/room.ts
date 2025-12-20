import { Component } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { DefaultInput } from '../default-input/default-input';

@Component({
  selector: 'room',
  imports: [DefaultButton, DefaultInput],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {

  totalSqft: number = 0;
  calculatedPrice: number = 0;

}
