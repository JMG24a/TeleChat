import { AuthContext } from "@context/auth";
import { TMessage, TUser } from "interface";
import { useRouter } from "next/router";
import socketIOClient from "socket.io-client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { GrMultiple, GrSend } from "react-icons/gr";
import { useInputValue } from "src/hooks/input";

const ENDPOINT = "localhost:3001";

function Chat() {
  const [messagesInfo, setMessage] = useState([]);
  const [userInfo, setUserInfo] = useState<TUser>();
  let selectedFile: any;
  let inputMessage = useInputValue("");

  const {
    auth: { isLogin },
    userInfo: { getUser },
    messageInfo: { getMessage, createdMessage },
    permit: { getToken },
  } = useContext(AuthContext);

  const router = useRouter();

  const findMessages = async () => {
    const token = getToken();
    const { chats } = router.query;
    const message = await getMessage(chats, token);
    setMessage(message);
  };

  const findUser = async () => {
    const token = getToken();
    const user = await getUser(token);
    setUserInfo(user);
  };

  const handleFile = (e: any) => {
    const files = e.target.files;
    selectedFile = files[0];
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const token = getToken();
    const theMessage = inputMessage.getValue;
    if (theMessage.length >= 1) {
      const { chats } = router.query;
      const MSS = {
        chat: chats,
        message: theMessage,
        selectedFile,
      };
      createdMessage(MSS, token);
    }
  };

  useEffect(() => {
    if (isLogin) {
      const socket = socketIOClient(ENDPOINT);
      socket.on("message", (data) => {
        const { chats } = router.query;
        if (data === chats) {
          findMessages();
        }
      });

      if (messagesInfo.length >= 0) {
        findMessages();
      }

      if (!userInfo) {
        findUser();
      }
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {messagesInfo.length >= 1 ? (
        <div className="mb-24">
          {messagesInfo.map((item: TMessage, i) => {
            const classNameDefault =
              item.user._id === userInfo?._id
                ? "flex flex-col justify-center w-full items-end rounded-tr-xl rounded-l-xl text-right"
                : "flex flex-col justify-center w-full items-start rounded-l-xl rounded-l-xl text-left";

            const classNameMessage =
              item.user._id === userInfo?._id
                ? "bg-teal-400 rounded-tr-xl rounded-l-xl text-right py-0 px-2 m-2"
                : "bg-gray-400 rounded-tl-xl rounded-r-xl text-left py-0 px-2 m-2";

            return (
              <div className={classNameDefault} key={i}>
                <div className={classNameMessage}>
                  <p className="font-light">{item.user.name}</p>
                  <p>{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>No messages</>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-around bg-teal-500 p-2 w-full bottom-6 fixed">
          <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl flex justify-center align-middle items-center h-10 w-10">
            <GrMultiple size={"20px"} />
            <input
              type="file"
              onChange={(e) => handleFile(e)}
              className="fixed w-9 text-transparent file:bg-transparent file:rounded-full file:border-0 file:text-transparent hover:file:bg-transparent"
            />
          </div>
          <textarea
            className="rounded-md w-2/3 h-10 max-h-10 min-h-full p-1"
            value={inputMessage.getValue}
            onChange={(e) => inputMessage.onChange(e)}
          />
          <button
            type="submit"
            className="bg-white rounded-tr-3xl rounded-tl-3xl rounded-br-3xl flex justify-center align-middle items-center h-10 w-10"
          >
            <GrSend size={"25px"} />
          </button>
        </div>
      </form>
    </>
  );
}

export { Chat };
