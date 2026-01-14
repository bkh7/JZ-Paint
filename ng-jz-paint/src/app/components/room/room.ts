import { Component, HostListener, ElementRef, Input } from '@angular/core';
import { DefaultInput } from '../default-input/default-input';
import { RoomInterface } from '../../interfaces/room-interface';
import { OnInit } from '@angular/core';
import { Firestore, collection, doc, addDoc, getDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'room',
  imports: [DefaultInput, DecimalPipe],
  templateUrl: './room.html',
  styleUrl: './room.scss',
  providers: [DecimalPipe]
})
export class Room implements OnInit {

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


  constructor(private el: ElementRef, private firestore: Firestore) { }

  async ngOnInit() {
    const quoteRef = doc(this.firestore, 'settings', 'appSettings');
    const quoteSnap = await getDoc(quoteRef); //get current quote document

    if (quoteSnap.exists()) {
      const data = quoteSnap.data();
      this.wallPricePerSqft = parseFloat(data['wallPricePerSqft']);
      this.ceilingPricePerSqft = parseFloat(data['ceilingPricePerSqft']);
      this.trimPricePerSqft = parseFloat(data['trimPricePerSqft']);
      this.pricerPerDoorFace = parseFloat(data['pricePerDoorFace']);
      this.pricePerDoorFrame = parseFloat(data['pricePerDoorFrame']);
      this.pricePerWindowFrame = parseFloat(data['pricePerWindowFrame']);
    }
    this.calculateSqft();
    this.calculatePrice();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.querySelector('.card').getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.el.nativeElement.style.setProperty('--mouse-x', `${x}%`);
    this.el.nativeElement.style.setProperty('--mouse-y', `${y}%`);
  }

  onValueChange() {

    this.roomData.numAddons = ((parseInt(this.roomData.numDoorFaces) || 0) + (parseInt(this.roomData.numDoorFrames) || 0) + (parseInt(this.roomData.numWindowFrames) || 0)).toString();
    this.calculateSqft();
    this.calculatePrice();

  }

  
parseFeetInches(value: string): number {
  if (!value) return 0;
  // Match feet and inches in various formats, e.g. 11'10, 11’10, 11' 10, 11’ 10, 11'10", 11’10", etc.
  const regex = /^\s*(\d+)\s*['’]\s*(\d+)?\s*(?:\"|in)?\s*$/i;
  const regexFeetOnly = /^\s*(\d+)\s*['’]?\s*$/i;
  const regexInchesOnly = /^\s*(\d+)\s*(?:\"|in)\s*$/i;

  let feet = 0, inches = 0;

  if (regex.test(value)) {
    const match = value.match(regex);
    feet = parseInt(match![1], 10) || 0;
    inches = parseInt(match![2], 10) || 0;
  } else if (regexFeetOnly.test(value)) {
    const match = value.match(regexFeetOnly);
    feet = parseInt(match![1], 10) || 0;
  } else if (regexInchesOnly.test(value)) {
    const match = value.match(regexInchesOnly);
    inches = parseInt(match![1], 10) || 0;
  } else {
    // fallback: try to parse as feet
    feet = parseFloat(value) || 0;
  }

  return feet + inches / 12;
}


  calculateSqft() {
    const ceilingArea = this.parseFeetInches(this.roomData.ceilingLength) * this.parseFeetInches(this.roomData.ceilingWidth);
    this.ceilingSqft = ceilingArea;
    this.roomData.ceilingArea = ceilingArea.toString();

    const wallArea = 2 * (this.parseFeetInches(this.roomData.wallLength) + this.parseFeetInches(this.roomData.wallWidth)) * this.parseFeetInches(this.roomData.wallHeight);
    this.wallSqft = wallArea;
    this.roomData.wallArea = wallArea.toString();

    const trimArea = this.parseFeetInches(this.roomData.trimLength) * this.parseFeetInches(this.roomData.trimWidth);
    this.trimSqft = trimArea;
    this.roomData.trimArea = trimArea.toString();
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
