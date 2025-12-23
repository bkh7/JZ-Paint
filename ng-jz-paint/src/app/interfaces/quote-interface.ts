import { RoomInterface } from "./room-interface";

export interface QuoteInterface {

    quoteName: string;
    numberOfRooms: string;
    totalPrice: string;

    rooms: RoomInterface[];

}
