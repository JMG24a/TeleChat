const API = process.env.API_CHAT;
const VERSION = process.env.API_VERSION;

export const endpoint = {
  auth: {
    login: `${API}/api/${VERSION}/users`,
  },
};
