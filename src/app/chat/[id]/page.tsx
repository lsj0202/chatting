"use client";

import BottomBar from "@/app/components/BottomBar";
import MessageBubble from "@/app/components/MessageBubble";
import SideBar from "@/app/components/SideBar";
import TopBar from "@/app/components/TopBar";
import { auth, db } from "@/app/firebase";
import { IMessage } from "@/app/types";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";

const Chat = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const ref = useRef<HTMLDivElement>(null);

  const q = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [chat] = useDocumentData(doc(db, "chats", id as string));

  const getOtherUser = (users: User[], currentUser: User) => {
    return users?.filter((user) => user?.email !== currentUser?.email)[0];
  };

  console.log("Chat", id);
  return (
    <main className="grid w-full h-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id as string} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        <TopBar user={getOtherUser(chat?.usersData, user as User)} />
        <div className="flex w-full h-full px-6 pt-4 mb-2 max-h-[calc(100dvh_-_70px_-_74px_-_10px)] overflow-y-scroll no-scollbar">
          <div className="flex flex-col w-full h-full">
            {loading && (
              <div className="flex flex-col w-full h-full">
                <CgSpinner className="w-12 h-12 text-gray-400 animate-spin" />
              </div>
            )}
            {!loading && messages?.length == 0 && (
              <div className="flex flex-col items-center justify-center flex-1">
                <IoChatbubbleOutline className="w-24 h-24 text-gray-300" />
                <p className="text-2xl font-medium tracking-tight text-gray-300">
                  대화를 시작합니다.
                </p>
              </div>
            )}
            {messages?.map((message, i) => (
              <MessageBubble
                user={user as User}
                message={message as IMessage}
                key={i}
              />
            ))}
            <div ref={ref}></div>
          </div>
        </div>
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default Chat;
