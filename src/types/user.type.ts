import { RoomType } from './room.type';

export type UserType = {
  name: string;
  userId: string;
  friends: any[];
  rooms: RoomType[];
};