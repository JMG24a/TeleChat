import { ListChats } from "@components/ListChats";
import { Emblem } from "@components/Emblem";
import { AuthContext } from "@context/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "@components/Modal";
import { AddChat } from "@components/AddChat";
import { TUser } from "interface";

function Dashboard() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [infoUser, setUserInfo] = useState<TUser>();
  const [modal, setModal] = useState<boolean>(false);

  const {
    auth: { isLogin },
    permit: { getToken },
    userInfo: { getUser },
    chatInfo: { getChat },
  } = useContext(AuthContext);

  const findUser = async () => {
    const token = getToken();
    const user = await getUser(token);
    setUserInfo(user);
  };

  const findChats = async () => {
    const token = getToken();
    const chat = await getChat(token);
    setChats(chat);
  };

  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
    if (chats.length <= 0 && !!isLogin) {
      findChats();
    }
    if (!infoUser) {
      findUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col">
      <div className="bg-teal-700">
        {infoUser?._id ? (
          <p className="rounded-r-2xl text-xl font-bold text-teal-700  bg-teal-300 inline-block p-2">
            {infoUser.name}
          </p>
        ) : (
          <p>loading...</p>
        )}
      </div>
      <div className="flex flex-col items-center relative">
        <Emblem />
        <p className="absolute mt-32 font-bold">Contacts</p>
      </div>
      <div className="flex flex-col items-center relative">
        <button
          className="bg-teal-700 rounded-2xl text-white p-2"
          onClick={() => setModal(!modal)}
        >
          Chat+
        </button>
        {!!modal && (
          <Modal>
            <AddChat findChats={findChats} setModal={setModal} />
          </Modal>
        )}
      </div>
      {chats.length > 0 ? <ListChats chats={chats} /> : <></>}
    </section>
  );
}

export { Dashboard };
