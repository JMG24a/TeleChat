import { Contact } from "@components/Contact";
import { TChat } from "interface";
import Link from "next/link";
import React from "react";

function ListChats({ chats }: IProps) {
  return (
    <div className="flex flex-col mt-12 mb-5">
      {chats.map((item: TChat, index) => (
        <Link href={`/chat/${item._id}`} key={index}>
          <a href="chat">
            <Contact chat={item} />
          </a>
        </Link>
      ))}
    </div>
  );
}

interface IProps {
  chats: TChat[];
}

export { ListChats };
