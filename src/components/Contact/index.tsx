import { TChat } from "interface";
import React from "react";

function Contact({ chat }: IProps) {
  return (
    <div className="bg-gray-500/10 p-2 cursor-pointer flex items-center border-b-2 border-gray-400/50">
      <div className="bg-white  rounded-2xl inline-block mr-2 p-2 font-bold">
        <p>{`${chat.name}`}</p>
      </div>
      <p>hello</p>
    </div>
  );
}

interface IProps {
  chat: TChat;
}

export { Contact };
