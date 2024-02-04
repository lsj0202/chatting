import { User } from "firebase/auth";

export type IMessage = {
  sender: string;
  photoURL: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    sesonds: number;
  };
};

export type IChat = {
  id: string;
  users: string[];
  usersData: User[];
  timestamp: {
    nanoseconds: number;
    sesonds: number;
  };
};
