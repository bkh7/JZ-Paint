import { RoomInterface } from "./room-interface";

export interface QuoteInterface {

    quoteName: string;
    dateModified: string;
    customerId: string;
    customerStreetAddress: string;
    customerZipCode: string;
    customerCity: string;
    customerPhoneNumber: string;
    numberOfRooms: string;
    totalPrice: string;

    //quote details
    paintBrand: string;
    sheen: string;
    colors: string;
    numberOfCoats: string;
    expectedDeposit: string;
    startDate: string;

    rooms: RoomInterface[];

}
