"use client";

import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { CgSpinner } from "react-icons/cg";
import Login from "../components/Login";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastActive: serverTimestamp(),
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-6 flex justify-center h-screen bg-slate-800">
        {loading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <CgSpinner className="w-20 h-10 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <IoChatbubbleEllipsesOutline className="w-24 h-24 text-gray-300" />
            <p className="text-2xl text-gray-300">대화를 시작합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
