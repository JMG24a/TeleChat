import React from "react";
import { Chat } from "@components/Chat";
import { AuthContext } from "@context/auth";
import { TChat } from "interface";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useInputValue } from "src/hooks/input";

function AddChat({ findChats, setModal }: IProps) {
  const [addChat, setChat] = useState<TChat>({ name: "none", users: [] });
  const [createdState, setCreatedState] = useState<string>("");

  const {
    permit: { getToken },
    chatInfo: { createdChat },
  } = useContext(AuthContext);

  let chatName = useInputValue("");
  let emailUser = useInputValue("");

  const addUser = () => {
    const user: string = emailUser.getValue;
    const userChat = addChat.users;

    const fil = userChat.filter((item) => item !== user);
    fil.push(user);

    setChat({
      name: chatName.getValue,
      // eslint-disable-next-line no-unsafe-optional-chaining
      users: fil,
    });
    emailUser.getValue = "";
  };

  const onReset = () => {
    emailUser.onChange("");
  };

  const alert = () => {
    setTimeout(() => {
      setModal(false);
    }, 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getToken();
    const response = await createdChat(token, addChat);
    // eslint-disable-next-line no-useless-escape
    const regExp = /\Created/g;
    if (regExp.test(response)) {
      findChats();
    }

    setCreatedState(response);
    alert();
  };

  return (
    <div>
      {addChat.users.length > 0 && (
        <Chat chat={addChat} setChat={setChat}></Chat>
      )}
      <h3 className="mt-5 text-center">Crea un chat</h3>
      <form
        className="flex flex-col justify-center item-center mb-12"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="ml-2">
          Name chat
        </label>
        <input
          className="border rounded m-2"
          name="name"
          id="name"
          value={chatName.getValue}
          onChange={(e: ChangeEvent) => chatName.onChange(e)}
        />
        <label htmlFor="email" className="ml-2">
          Email
        </label>
        <input
          className="border rounded  m-2"
          type="email"
          name="email"
          id="email"
          value={emailUser.getValue}
          onChange={(e: ChangeEvent) => emailUser.onChange(e)}
        />
        <div className="flex justify-around">
          <button
            className="bg-gray-700 text-white rounded p-1 m-2"
            type="reset"
            onClick={onReset}
          >
            reset
          </button>
          <button
            className="bg-teal-700 text-white rounded p-1 m-2"
            type="button"
            onClick={addUser}
          >
            Add
          </button>
        </div>
        <button className="bg-teal-600 text-white rounded p-1" type="submit">
          Enviar
        </button>
      </form>
      {createdState.length > 0 && (
        <p className="text-center bg-teal-100">{createdState}</p>
      )}
    </div>
  );
}

export { AddChat };

interface IProps {
  findChats: () => void;
  setModal: React.useState;
}
