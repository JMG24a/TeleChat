import { TChat, TCreateUser, TLogin, TMessage, TUser } from "interface";
import React, { createContext, Dispatch, useState } from "react";
import { useGetChatInfo } from "src/hooks/getChats";
import { useGetMessageInfo } from "src/hooks/getMessages";
import { useGetUserInfo } from "src/hooks/getUser";
import { useLogin } from "src/hooks/login";

interface authContext {
  auth: {
    isLogin: boolean;
    isLogout: boolean;
    loginError: string;
    isCreated: string | boolean;
    // eslint-disable-next-line no-unused-vars
    newLogin?: (body: TLogin) => void;
    setIsLogout?: React.Dispatch<React.SetStateAction<boolean>>;
    setError?: Dispatch<string>;
    // eslint-disable-next-line no-unused-vars
    createUser?: (payload: TCreateUser) => void;
  };
  permit?: {
    getToken?: () => string | false;
    removeAuth?: () => void;
  };
  userInfo?: {
    getUser?: () => TUser;
  };
  chatInfo?: {
    getChat?: () => TChat;
    createdChat?: () => string;
  };
  messageInfo?: {
    getMessage?: () => TMessage;
    createdMessage?: () => void;
  };
}

const AuthContext = createContext<authContext>({
  auth: {
    isLogin: false,
    isLogout: false,
    loginError: "",
    isCreated: false,
  },
});

interface IProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: IProps) => {
  const { isLogin, setIsLogin, authLogin, loginError, setError } = useLogin();
  const { getUser } = useGetUserInfo();
  const { getChat, createdChat } = useGetChatInfo();
  const { getMessage, createdMessage } = useGetMessageInfo();
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [isCreated, setCreated] = useState<boolean | string>(false);

  const getToken = () => {
    let token = undefined;
    token = window.sessionStorage.getItem("token");
    if (token) {
      return token;
    }
    return false;
  };

  const removeAuth = () => {
    window.sessionStorage.removeItem("token");
    setIsLogin(false);
    setIsLogout(false);
  };

  const createUser = (payload: TCreateUser) => {
    const body = JSON.stringify(payload);
    window
      .fetch("http://localhost:3001/api/v1/users", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: body,
      })
      .then((res) => res.json())
      .then((res) => setCreated(res.success))
      .catch((e) => {
        setCreated("User could not be created");
        console.error(e.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: {
          isLogin,
          isLogout,
          loginError,
          isCreated,
          setIsLogout,
          newLogin: authLogin,
          setError,
          createUser,
        },
        permit: {
          getToken,
          removeAuth,
        },
        userInfo: {
          getUser,
        },
        chatInfo: {
          getChat,
          createdChat,
        },
        messageInfo: {
          getMessage,
          createdMessage,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
