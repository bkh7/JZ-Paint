import { Component, OnInit, QueryList, ViewChildren, Input } from '@angular/core'; // Added QueryList, ViewChildren
import { DefaultInput } from '../default-input/default-input';
import { Room } from '../room/room';
import { DefaultButton } from '../default-button/default-button';
import { QuoteInterface } from '../../interfaces/quote-interface';
import { RoomInterface } from '../../interfaces/room-interface';
import { Firestore, collection, doc, addDoc, getDoc, setDoc, deleteDoc } from '@angular/fire/firestore'; // Added for Firestore
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state';
import { VerifyDeleteModal } from '../verify-delete-modal/verify-delete-modal';
import { BackButton } from '../back-button/back-button';
import { WarningModal } from '../warning-modal/warning-modal';

@Component({
  selector: 'quote-editor',
  imports: [DefaultInput, Room, DefaultButton, CommonModule, VerifyDeleteModal, BackButton, WarningModal],
  templateUrl: './quote-editor.html',
  styleUrl: './quote-editor.scss',
})
export class QuoteEditor implements OnInit {
  quoteData: QuoteInterface = {
    quoteName: '',
    dateModified: '',
    customerId: '',
    customerStreetAddress: '',
    customerZipCode: '',
    customerCity: '',
    customerPhoneNumber: '',
    numberOfRooms: '0',
    totalPrice: '0',
    //quote details
    paintBrand: '',
    sheen: '',
    colors: '',
    numberOfCoats: '',
    expectedDeposit: '',
    startDate: '',
    paymentStatusID: '',
    rooms: [], // Start with one room
  };

  quotePID: string = '';
  appSettingsPID: string = '';


  @ViewChildren(Room) roomComponents!: QueryList<Room>; // Queries all <room> components

  constructor(private firestore: Firestore, public appState: AppStateService) { } // Added constructor for Firestore

  async ngOnInit() {
    this.arePriceSettingsValid();
    const quoteDocId = this.appState.currentQuoteId()?.toString(); //store current quote id from app state
    if (quoteDocId) {
      const quoteRef = doc(this.firestore, 'quotes', quoteDocId);
      const quoteSnap = await getDoc(quoteRef); //get current quote document

      if (quoteSnap.exists()) {
        const data = quoteSnap.data() as QuoteInterface; //cast data from firestore to QuoteInterface
        //assign to local variables to see in the editor
        this.quoteData.customerCity = data.customerCity;
        this.quoteData.customerPhoneNumber = data.customerPhoneNumber;
        this.quoteData.customerStreetAddress = data.customerStreetAddress;
        this.quoteData.customerZipCode = data.customerZipCode;
        this.quoteData.quoteName = data.quoteName;
        this.quoteData.numberOfRooms = data.numberOfRooms;
        this.quoteData.totalPrice = data.totalPrice;
        this.quoteData.paintBrand = data.paintBrand;
        this.quoteData.sheen = data.sheen;
        this.quoteData.colors = data.colors;
        this.quoteData.numberOfCoats = data.numberOfCoats;
        this.quoteData.expectedDeposit = data.expectedDeposit;
        this.quoteData.startDate = data.startDate;
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

  generateCustomerId(): string {
    var customerInitials = '';
    var idNumber = '';
    var id = '';
    const idLength = 7;
    var i = 1;

    if (!this.quoteData.quoteName) {
      customerInitials = '';
      return '';
    }
    customerInitials = this.quoteData.quoteName
      .split(' ')
      .filter(word => word.length > 1)
      .map(word => word[0].toUpperCase())
      .join('');

    while (i <= idLength - 2) {
      idNumber += Math.floor(Math.random() * 10).toString(); //number between 0-9
      i++;
    }
    id = customerInitials + idNumber;
    return id;

  }

  async saveQuote() {
    console.log('Saving quote...');
    // Collect data from room components via @ViewChildren
    const collectedRooms: RoomInterface[] = this.roomComponents.map(room => room.roomData);

    // Update quoteData
    this.quoteData.numberOfRooms = collectedRooms.length.toString();
    this.quoteData.totalPrice = collectedRooms.reduce((sum, room) => sum + (parseFloat(room.totalRoomPrice) || 0), 0).toString();
    this.quoteData.rooms = collectedRooms;
    this.quoteData.customerId = this.generateCustomerId();
    this.quoteData.dateModified = new Date().toISOString();
    this.quoteData.paymentStatusID = (await this.generatePriceStatusID()).toString();



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

  requestDelete() {
    this.appState.deleteModalVisible.set(true);
    console.log(this.appState.currentView());
  }

  async deleteQuote() {
    const quoteDocId = this.appState.currentQuoteId()?.toString();
    if (quoteDocId) {
      const quoteRef = doc(this.firestore, 'quotes', quoteDocId);
      await deleteDoc(quoteRef) // delete the document
      console.log('Quote deleted');
      //update app state to reflect changes
      this.appState.currentView.set('quotes-list'); // Return to quote list view after deletion
      this.appState.currentQuoteId.set(null); // Clear current quote ID
    }
  }

  makeTitleEditable() {
    this.appState.quoteTitleEditable.set(true);
    console.log('Title editable set to true');
  }

  makeTitleNonEditable() {
    this.appState.quoteTitleEditable.set(false);
    console.log('Title editable set to false');
  }

  async generatePriceStatusID(): Promise<string> {
    const docRef = doc(this.firestore, 'settings/appSettings');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data['paymentStatusID'];
    } else {
      // Handle missing document
      return '';
    }
  }

  async arePriceSettingsValid() {
    const docRef = doc(this.firestore, 'settings/appSettings');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.appSettingsPID = data['paymentStatusID'];

    }

    const qDocRef = doc(this.firestore, 'quotes', this.appState.currentQuoteId() || '');
    const quoteSnap = await getDoc(qDocRef);

    if (quoteSnap.exists()) {
      const quoteData = quoteSnap.data() as QuoteInterface;
      this.quotePID = quoteData.paymentStatusID;
  }
  console.log('Checking', this.appSettingsPID, this.quotePID);
  if (this.appSettingsPID == this.quotePID) {
     this.appState.warningModalVisible.set(false);
    }
    else {
    this.appState.warningModalVisible.set(true);
    }
  }

}