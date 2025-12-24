import { Component, OnInit, QueryList, ViewChildren, Input } from '@angular/core'; // Added QueryList, ViewChildren
import { DefaultInput } from '../default-input/default-input';
import { Room } from '../room/room';
import { DefaultButton } from '../default-button/default-button';
import { QuoteInterface } from '../../interfaces/quote-interface';
import { RoomInterface } from '../../interfaces/room-interface';
import { Firestore, collection, doc, addDoc, getDoc, getDocs, setDoc } from '@angular/fire/firestore'; // Added for Firestore
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state';

@Component({
  selector: 'quote-editor',
  imports: [DefaultInput, Room, DefaultButton, CommonModule],
  templateUrl: './quote-editor.html',
  styleUrl: './quote-editor.scss',
})
export class QuoteEditor implements OnInit {
  quoteData: QuoteInterface = {
    quoteName: '',
    numberOfRooms: '0',
    totalPrice: '0',
    rooms: [], // Start with one room
  };

  @ViewChildren(Room) roomComponents!: QueryList<Room>; // Queries all <room> components

  constructor(private firestore: Firestore, public appState: AppStateService) { } // Added constructor for Firestore

  async ngOnInit() {
    const quoteDocId = this.appState.currentQuoteId()?.toString(); //store current quote id from app state
    if (quoteDocId) {
      const quoteRef = doc(this.firestore, 'quotes', quoteDocId);
      const quoteSnap = await getDoc(quoteRef); //get current quote document

      if (quoteSnap.exists()) {
        const data = quoteSnap.data() as QuoteInterface; //cast data from firestore to QuoteInterface
        //assign to local variables to see in the editor
        this.quoteData.quoteName = data.quoteName;
        this.quoteData.numberOfRooms = data.numberOfRooms;
        this.quoteData.totalPrice = data.totalPrice;
        this.quoteData.rooms = Array.isArray(data.rooms) && data.rooms.length > 0
          ? data.rooms //create empty room if no rooms exist
          : [this.createRoom()];
      }
    }
  }

  createRoom(length?: string, width?: string, height?: string): RoomInterface {
    return {
      roomName: '',
      wallLength: length || '',
      wallWidth: width || '',
      wallHeight: height || '',
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

  addEmptyRoom() {
    this.quoteData.rooms.push(this.createRoom());
  }

  addTenByTenRoom() {
    this.quoteData.rooms.push(this.createRoom('10', '10', '8'));
  }

  async saveQuote() {
    console.log('Saving quote...');
    // Collect data from room components via @ViewChildren
    const collectedRooms: RoomInterface[] = this.roomComponents.map(room => room.roomData);

    // Update quoteData
    this.quoteData.numberOfRooms = collectedRooms.length.toString();
    this.quoteData.totalPrice = collectedRooms.reduce((sum, room) => sum + (parseFloat(room.totalRoomPrice) || 0), 0).toString();
    this.quoteData.rooms = collectedRooms;

    const quoteDocId = this.appState.currentQuoteId()?.toString();
    if (quoteDocId) { //update existing document
      const quoteRef = doc(this.firestore, 'quotes', quoteDocId);
      // This will update the document if it exists, or create it if it doesn't
      await setDoc(quoteRef, this.quoteData, { merge: false });
      console.log('Quote updated');
    } else {
      // If no ID, create a new document
      const quotesCollection = collection(this.firestore, 'quotes');
      await addDoc(quotesCollection, this.quoteData);
      console.log('Quote created');
    }

    //update app state to reflect changes
    this.appState.currentView.set('quotes-list'); // Return to quote list view after saving
    this.appState.currentQuoteId.set(null); // Clear current quote ID

  }

  async deleteQuote() {}

  makeTitleEditable() {
    this.appState.quoteTitleEditable.set(true);
    console.log('Title editable set to true');
  }

  makeTitleNonEditable() {
    this.appState.quoteTitleEditable.set(false);
    console.log('Title editable set to false');
  }

}