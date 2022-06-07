import { TLogin } from "interface";
import { useState } from "react";

const useLogin = () => {
  const [loginSuccess, setSuccess] = useState<boolean>(false);
  const [loginError, setError] = useState<string>("");

  const authLogin = (body: TLogin = { email: "", password: "" }) => {
    window
      .fetch("http://localhost:3001/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      .then((res) => res.json())
      .then((res: IsLogin) => {
        if (res.error.includes("Error: ")) {
          setSuccess(false);
          res.error = res.error.replace("Error: ", "");
          setError(res.error);
        } else {
          setSuccess(true);
          window.sessionStorage.setItem("token", res.success.token);
        }
      })
      .catch((err) => {
        console.error("ERROR LOGIN FETCH:", err);
        setSuccess(false);
      });
  };

  return {
    isLogin: loginSuccess,
    setIsLogin: setSuccess,
    authLogin,
    loginError,
    setError,
  };
};

interface IsLogin {
  error: string;
  success: {
    name: string;
    token: string;
  };
}

export { useLogin };
