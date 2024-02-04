import { User } from "firebase/auth";
import { IMessage } from "../types";
import Image from "next/image";

type MessageBubbleProps = {
  user: User;
  message: IMessage;
};

const MessageBubble = ({ user, message }: MessageBubbleProps) => {
  const sender = message.sender === user?.email;

  return (
    <div className={sender ? "flex justify-end" : "flex justify-start"}>
      {!sender && (
        <div className="flex-shrink-0 mr-2">
          <Image
            width={30}
            height={30}
            src={user.photoURL!}
            alt={user.displayName!}
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={
          !sender
            ? "bg-[#D9D9D9] py-3 px-4 rounded-lg rounded-tl-none my-1 text-sm w-auto max-w-lg"
            : "bg-[#D9D9D9] py-3 px-4 rounded-lg rounded-br-none my-1 text-sm w-auto max-w-lg"
        }
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
