import { TChat } from "interface";
import React, { useState } from "react";

function Chat({ chat, setChat }: IProps) {
  const deleteUser = (user: string) => {
    const array = chat.users.filter((item) => item !== user);

    setChat({
      name: chat.name,
      users: array,
    });
  };

  return (
    <div className="bg-teal-400 mt-4 rounded p-2">
      <p className="bg-teal-900 text-white text-center">{chat.name}</p>
      <div>
        {chat.users.map((user, index) => (
          <div key={index} className="flex justify-between">
            <p>{user}</p>
            <button onClick={() => deleteUser(user)}>☒</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Chat };

interface IProps {
  chat: TChat;
  setChat: useState;
}
