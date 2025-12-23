import { Component, QueryList, ViewChildren } from '@angular/core'; // Added QueryList, ViewChildren
import { DefaultInput } from '../default-input/default-input';
import { Room } from '../room/room';
import { DefaultButton } from '../default-button/default-button';
import { QuoteInterface } from '../../interfaces/quote-interface';
import { RoomInterface } from '../../interfaces/room-interface';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore'; // Added for Firestore
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'quote-editor',
  imports: [DefaultInput, Room, DefaultButton, CommonModule],
  templateUrl: './quote-editor.html',
  styleUrl: './quote-editor.scss',
})
export class QuoteEditor {
  quoteData: QuoteInterface = {
    quoteName: '',
    numberOfRooms: '0',
    totalPrice: '0',
    rooms: [this.createEmptyRoom()], // Start with one room
  };

  @ViewChildren(Room) roomComponents!: QueryList<Room>; // Queries all <room> components

  constructor(private firestore: Firestore) {} // Added constructor for Firestore

  createEmptyRoom(): RoomInterface {
    return {
      roomName: '',
      wallLength: '',
      wallWidth: '',
      wallHeight: '',
      wallArea: '',
      ceilingLength: '',
      ceilingWidth: '',
      ceilingArea: '',
      trimLength: '',
      trimWidth: '',
      trimArea: '',
      numDoorFaces: '',
      numDoorFrames: '',
      numWindowFrames: '',
      numAddons: '0',
      wallPrice: '',
      ceilingPrice: '',
      trimPrice: '',
      doorFacePrice: '',
      doorFramePrice: '',
      windowFramePrice: '',
      addonTotalPrice: '',
      totalRoomPrice: '',
    };
  }

  addRoom() {
    this.quoteData.rooms.push(this.createEmptyRoom());
  }

  saveQuote() {
    console.log('Saving quote...');
    // Collect data from room components via @ViewChildren
    const collectedRooms: RoomInterface[] = this.roomComponents.map(room => room.roomData);
    
    // Update quoteData
    this.quoteData.numberOfRooms = collectedRooms.length.toString();
    this.quoteData.totalPrice = collectedRooms.reduce((sum, room) => sum + (parseFloat(room.totalRoomPrice) || 0), 0).toString();
    this.quoteData.rooms = collectedRooms;

    // Save to Firestore v9+
    const quotesCollection = collection(this.firestore, 'quotes');
    addDoc(quotesCollection, this.quoteData).then(() => {
      console.log('Quote saved');
    }).catch(error => {
      console.error('Error saving quote:', error);
    });
  }
}