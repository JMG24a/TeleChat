export const useGetMessageInfo = () => {
  const getMessage = async (chat: string, token: string) => {
    const res = await fetch(`http://localhost:3001/api/v1/messages/${chat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    return response.success;
  };

  const createdMessage = async (payload: IMessage, token: string) => {
    const body = JSON.stringify(payload);
    const res = await fetch(`http://localhost:3001/api/v1/messages`, {
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
    getMessage,
    createdMessage,
  };
};

interface IMessage {
  chat: string;
  message: string;
  file: any;
}
