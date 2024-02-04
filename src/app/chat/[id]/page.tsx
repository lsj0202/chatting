"use client";

import BottomBar from "@/app/components/BottomBar";
import SideBar from "@/app/components/SideBar";
import { auth, db } from "@/app/firebase";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React from "react";
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

  const q = query(
    collection(db, "chats", id as string, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);

  const [chat] = useDocumentData(doc(db, "chats", id as string));

  console.log("Chat", id);
  return (
    <main className="grid w-full h-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id as string} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        Topbar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scollbar">
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
          </div>
        </div>
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default Chat;
