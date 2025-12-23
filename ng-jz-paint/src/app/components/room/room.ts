import { Component, HostListener, ElementRef, Input } from '@angular/core';
import { DefaultInput } from '../default-input/default-input';
import { RoomInterface } from '../../interfaces/room-interface';

@Component({
  selector: 'room',
  imports: [DefaultInput],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {

  @Input() roomData!: RoomInterface;



  ceilingSqft: number = 0;
  wallSqft: number = 0;
  trimSqft: number = 0;


  //Pricing
  wallPricePerSqft: number = 0.75;
  ceilingPricePerSqft: number = 1.00;
  trimPricePerSqft: number = 2.00;
  pricerPerDoorFace: number = 40.00;
  pricePerDoorFrame: number = 40.00
  pricePerWindowFrame: number = 40.00;
  

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

    this.roomData.numAddons = ((parseInt(this.roomData.numDoorFaces) || 0) + (parseInt(this.roomData.numDoorFrames) || 0) + (parseInt(this.roomData.numWindowFrames) || 0)).toString();
    this.calculateSqft();
    this.calculatePrice();

  }

  calculateSqft() {

    const ceilingArea = (parseFloat(this.roomData.ceilingLength) || 0) * (parseFloat(this.roomData.ceilingWidth) || 0);
    this.ceilingSqft = ceilingArea;

    const wallArea = 2 * ((parseFloat(this.roomData.wallLength) || 0) + (parseFloat(this.roomData.wallWidth) || 0)) * (parseFloat(this.roomData.wallHeight) || 0);
    this.wallSqft = wallArea;

    const trimArea = (parseFloat(this.roomData.trimLength) || 0) * (parseFloat(this.roomData.trimWidth) || 0);
    this.trimSqft = trimArea;

  }

  calculatePrice() {

    this.roomData.ceilingPrice = (this.ceilingSqft * this.ceilingPricePerSqft).toString();
    this.roomData.wallPrice = (this.wallSqft * this.wallPricePerSqft).toString();
    this.roomData.trimPrice = (this.trimSqft * this.trimPricePerSqft).toString();

    this.roomData.doorFacePrice = ((parseInt(this.roomData.numDoorFaces) || 0) * this.pricerPerDoorFace).toString();
    this.roomData.doorFramePrice = ((parseInt(this.roomData.numDoorFrames) || 0) * this.pricePerDoorFrame).toString();
    this.roomData.windowFramePrice = ((parseInt(this.roomData.numWindowFrames) || 0) * this.pricePerWindowFrame).toString();
    
    this.roomData.addonTotalPrice = ((parseFloat(this.roomData.doorFacePrice) || 0) + (parseFloat(this.roomData.doorFramePrice) || 0) + (parseFloat(this.roomData.windowFramePrice) || 0)).toString();
 
 
    this.roomData.totalRoomPrice = ((parseFloat(this.roomData.ceilingPrice) || 0) + (parseFloat(this.roomData.wallPrice) || 0) + (parseFloat(this.roomData.trimPrice) || 0) + (parseFloat(this.roomData.addonTotalPrice) || 0)).toString();
  }

}
