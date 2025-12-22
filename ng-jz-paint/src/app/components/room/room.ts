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
  trimSqft: number = 0;

  //Two-way binding variables for inputs
  ceilingLength: string = '';
  ceilingWidth: string = '';
  wallLength: string = '';
  wallWidth: string = '';
  wallHeight: string = '';
  trimLength: string = '';
  trimWidth: string = '';
  roomName: string = '';
  numDoorFaces: string = '';
  numDoorFrames: string = '';
  numWindowFrames: string = '';
  numAddons: string = '0';

  //Pricing
  wallPricePerSqft: number = 0.75;
  ceilingPricePerSqft: number = 1.00;
  trimPricePerSqft: number = 2.00;
  pricerPerDoorFace: number = 40.00;
  pricePerDoorFrame: number = 40.00
  pricePerWindowFrame: number = 40.00;
  //Calculated prices
  wallTotalPrice: number = 0;
  ceilingTotalPrice: number = 0;
  trimTotalPrice: number = 0;
  doorFaceTotalPrice: number = 0;
  doorFrameTotalPrice: number = 0
  windowFrameTotalPrice: number = 0;
  addonTotalPrice: number = 0;
  totalPrice: number = 0;

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

    this.numAddons = ((parseInt(this.numDoorFaces) || 0) + (parseInt(this.numDoorFrames) || 0) + (parseInt(this.numWindowFrames) || 0)).toString();
    this.calculateSqft();
    this.calculatePrice();

  }

  calculateSqft() {

    const ceilingArea = (parseFloat(this.ceilingLength) || 0) * (parseFloat(this.ceilingWidth) || 0);
    this.ceilingSqft = ceilingArea;

    const wallArea = 2 * ((parseFloat(this.wallLength) || 0) + (parseFloat(this.wallWidth) || 0)) * (parseFloat(this.wallHeight) || 0);
    this.wallSqft = wallArea;

    const trimArea = (parseFloat(this.trimLength) || 0) * (parseFloat(this.trimWidth) || 0);
    this.trimSqft = trimArea;

  }

  calculatePrice() {

    this.ceilingTotalPrice = this.ceilingSqft * this.ceilingPricePerSqft;
    this.wallTotalPrice = this.wallSqft * this.wallPricePerSqft;
    this.trimTotalPrice = this.trimSqft * this.trimPricePerSqft;

    this.doorFaceTotalPrice = (parseInt(this.numDoorFaces) || 0) * this.pricerPerDoorFace;
    this.doorFrameTotalPrice = (parseInt(this.numDoorFrames) || 0) * this.pricePerDoorFrame;
    this.windowFrameTotalPrice = (parseInt(this.numWindowFrames) || 0) * this.pricePerWindowFrame;
    
    this.addonTotalPrice = this.doorFaceTotalPrice + this.doorFrameTotalPrice + this.windowFrameTotalPrice;
 
 
    this.totalPrice = this.ceilingTotalPrice + this.wallTotalPrice + this.trimTotalPrice + this.addonTotalPrice;
  }

}
