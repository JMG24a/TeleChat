import React, { ChangeEvent, FormEvent, useContext } from "react";
import { Input } from "@components/Input";
import { useInputValue } from "src/hooks/input";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";

function Form() {
  const {
    auth: { newLogin, loginError, isLogin },
  } = useContext(AuthContext);
  const router = useRouter();
  let email = useInputValue("");
  let password = useInputValue("");

  const input = {
    email: email.getValue,
    password: password.getValue,
  };

  // eslint-disable-next-line no-undef
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.email.length > 0 && input.password.length > 0) {
      newLogin(input);
      if (isLogin) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-500 h-auto p-2 rounded">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center item-center "
      >
        <Input
          type="text"
          name="Email"
          value={email.getValue} // <- asi
          onChange={(e: ChangeEvent) => email.onChange(e)}
        />
        <Input
          type="password"
          name="Password"
          value={password.getValue} // <- asi
          onChange={(e: ChangeEvent) => password.onChange(e)}
        />
        <button className="text-white/60 hover:text-white bg-teal-800 rounded">
          Submit
        </button>
        {loginError.length > 1 && (
          <p className="text-center text-white">{loginError}</p>
        )}
      </form>
    </div>
  );
}

export { Form };
