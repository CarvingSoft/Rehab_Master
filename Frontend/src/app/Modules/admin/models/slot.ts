import { Category } from "./category";
import { Room } from "./room";


export interface Slot{
  _id:String,
  roomName :Room,
  slotName:String,
  startTime :string,
  endTime :String,
  weekDay:string,
  therapyCategory:Category,
  slotStatus:Boolean,
  onCall: boolean,
  items: any[];
}
