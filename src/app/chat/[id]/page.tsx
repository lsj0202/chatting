"use client";

import BottomBar from "@/app/components/BottomBar";
import SideBar from "@/app/components/SideBar";
import { auth } from "@/app/firebase";
import { User } from "firebase/auth";
import { useParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  console.log("Chat", id);
  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id as string} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        Topbar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scollbar">
          <div className="flex flex-col w-full h-full">Messages</div>
        </div>
        <BottomBar user={user as User} chatId={id as string} />
      </div>
    </main>
  );
};

export default Chat;
