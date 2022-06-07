export type TLogin = {
  email: string;
  password: string;
};

export type TCreateUser = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  _id: string;
  name: string;
};

export type TChat = {
  _id?: string;
  name: string;
  users: TUser[];
};

export type TMessage = {
  chat: string;
  fileURL?: string;
  message: string;
  user: TUser;
};
