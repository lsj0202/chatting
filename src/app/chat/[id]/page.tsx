"use client";

import SideBar from "@/app/components/SideBar";
import { useParams } from "next/navigation";
import React from "react";

const Chat = () => {
  const { id } = useParams();

  console.log("Chat", id);
  return (
    <div className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={String(id)} />
      </div>
      <div className="col-span-6 flex justify-center h-screen bg-slate-800">
        <div className="flex flex-col items-center justify-center space-y-4"></div>
      </div>
    </div>
  );
};

export default Chat;
