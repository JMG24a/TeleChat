export const useGetUserInfo = () => {
  const getUser = async (token: string) => {
    const res = await fetch("http://localhost:3001/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();
    return user.success;
  };

  return {
    getUser,
  };
};
