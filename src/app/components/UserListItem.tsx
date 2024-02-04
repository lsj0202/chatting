"use client";

import { User } from "firebase/auth";
import { IChat } from "../types";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";

type UserListItemProps = {
  sender: User;
  receiver: User;
  chats: IChat[];
  selectedId?: string;
};

const UserListItem = ({
  sender,
  receiver,
  chats,
  selectedId,
}: UserListItemProps) => {
  const chatExists = (receiverEmail: string) => {
    const senderEmail = sender.email!;

    return chats?.find(
      (chat: IChat) =>
        chat?.users?.includes(senderEmail) &&
        chat.users?.includes(receiverEmail)
    );
  };

  const router = useRouter();

  const redirect = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const chat = chatExists(receiver.email!);

  const handleClick = async () => {
    const senderData = {
      displayName: sender.displayName,
      photoURL: sender.photoURL,
      email: sender.email,
    };

    const receiverData = {
      displayName: sender.displayName,
      photoURL: sender.photoURL,
      email: sender.email,
    };

    if (!chat) {
      const { id } = await addDoc(collection(db, "chats"), {
        usersData: [senderData],
        users: [sender.email, receiver.email],
        timestamp: serverTimestamp(),
      });
      redirect(id);
    } else {
      redirect(chat.id);
    }
  };

  return (
    <div className="w-full p-4">
      <div
        className={`w-5/6 mx-auto px-4 flex flex-row items-center py-2 cursor-pointer ${
          chat && chat.id === selectedId && "border rounded-md"
        }`}
        onClick={handleClick}
      >
        <div>
          <Image
            src={receiver.photoURL!}
            alt={receiver.displayName!}
            width={35}
            height={35}
            className="rounded-full"
          />
        </div>
        <div className="ml-2">
          <p className="text-base">{receiver.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
