"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

type BottomBarProps = {
  user: User;
  chatId: string;
};

type FormData = {
  message: string;
};

const BottomBar = ({ user, chatId }: BottomBarProps) => {
  const schema = yup.object({
    message: yup.string().required("내용을 입력해주세요."),
  });

  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const sendMessage = async (data: FormData) => {
    console.log(data.message);

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: data.message,
      sender: user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(sendMessage)}
      className="flex items-end w-full px-6 pb-4 space-x-2"
    >
      <input
        {...register("message", { required: true })}
        placeholder="메시지를 입력하세요"
        className="w-full px-4 py-4 placeholder-gray-400 border border-gray200 rounded-lg focus:border-gray-400"
      />
      <div className="flex flex-col">
        <button type="submit">
          <IoPaperPlaneOutline className="mb-4 text-gray-600 w-7 h-7 hover:text-gray900" />
        </button>
      </div>
    </form>
  );
};

export default BottomBar;
