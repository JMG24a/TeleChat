import { TChat } from "interface";

export const useGetChatInfo = () => {
  const getChat = async (token: string) => {
    const res = await fetch("http://localhost:3001/api/v1/chats/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    return response.success;
  };

  const createdChat = async (token: string, payload: TChat) => {
    const body = JSON.stringify(payload);

    const res = await fetch("http://localhost:3001/api/v1/chats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: body,
    });

    const response = await res.json();
    return `${response.success.name} Created`;
  };

  return {
    getChat,
    createdChat,
  };
};
