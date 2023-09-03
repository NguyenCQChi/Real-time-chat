import { MessageType } from './message.type';

export type RoomType = {
  id: string,
  personSendId: string,
  personReceiveId: string,
  messages: MessageType[]
}