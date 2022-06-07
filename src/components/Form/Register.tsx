import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Input } from "@components/Input";
import { useInputValue } from "src/hooks/input";
import { AuthContext } from "@context/auth";

function Form() {
  const [errors, setErrors] = useState<string>("");

  const {
    auth: { isCreated, createUser },
  } = useContext(AuthContext);

  let email = useInputValue("");
  let name = useInputValue("");
  let password = useInputValue("");
  let password2 = useInputValue("");

  let input = {
    name: name.getValue,
    email: email.getValue,
    password: password.getValue,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email } = input;
    const is = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);

    if (input.name.length < 3) {
      setErrors("your name is too short");
      return 0;
    }

    if (!is) {
      setErrors("your mail is incorrect");
      return 0;
    }

    if (input.password.length < 3) {
      setErrors("your password is vulnerable");
      return 0;
    }

    if (input.password !== password2.getValue) {
      setErrors("passwords do not match");
      return 0;
    }
    createUser(input);
  };

  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-500 h-auto p-2 rounded">
      <form
        className="flex flex-col justify-center item-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          name="Name"
          onChange={(e: ChangeEvent) => name.onChange(e)}
          value={name.getValue}
        />
        <Input
          name="Email"
          onChange={(e: ChangeEvent) => email.onChange(e)}
          value={email.getValue}
        />
        <Input
          name="Password"
          onChange={(e: ChangeEvent) => password.onChange(e)}
          value={password.getValue}
        />
        <Input
          name="Password2"
          onChange={(e: ChangeEvent) => password2.onChange(e)}
          value={password2.getValue}
        />
        <button type="submit" className="text-white/60 hover:text-white">
          Submit
        </button>
        {!!errors && (
          <p className="font-semibold text-white flex justify-center">
            {errors}
          </p>
        )}
        {isCreated && (
          <p className="font-semibold text-white flex justify-center">
            {isCreated}
          </p>
        )}
      </form>
    </div>
  );
}

export { Form };
