import { Component, HostListener, ElementRef } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { DefaultInput } from '../default-input/default-input';

@Component({
  selector: 'room',
  imports: [DefaultButton, DefaultInput],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {

  ceilingSqft: number = 0;
  wallSqft: number = 0;

  //Two-way binding variables for inputs
  ceilingLength: string = '0';
  ceilingWidth: string = '0';
  wallLength: string = '0';
  wallWidth: string = '0';
  wallHeight: string = '0';

  //Pricing
  wallPricePerSqft: number = 0.75;
  ceilingPricePerSqft: number = 1.00;

  //Calculated prices
  wallTotalPrice: number = 0;
  ceilingTotalPrice: number = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.querySelector('.card').getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.el.nativeElement.style.setProperty('--mouse-x', `${x}%`);
    this.el.nativeElement.style.setProperty('--mouse-y', `${y}%`);
  }

  onValueChange(){

    this.calculateSqft();
    this.calculatePrice();

  }

  calculateSqft() {

    const ceilingArea = parseFloat(this.ceilingLength) * parseFloat(this.ceilingWidth);
    this.ceilingSqft = ceilingArea;

    const wallArea = 2 * (parseFloat(this.wallLength) + parseFloat(this.wallWidth)) * parseFloat(this.wallHeight);
    this.wallSqft = wallArea;

  }

  calculatePrice() {

    this.ceilingTotalPrice = this.ceilingSqft * this.ceilingPricePerSqft;
    this.wallTotalPrice = this.wallSqft * this.wallPricePerSqft;

  }

}
