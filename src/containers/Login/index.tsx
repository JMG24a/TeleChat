import { Emblem } from "@components/Emblem";
import { Form } from "@components/Form/Login";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <section className="flex justify-center flex-col w-full items-center">
      <Emblem />
      <h3 className="text-teal-900 font-bold">Log in</h3>
      <Form />
      <p className="text-teal-900 font-thin">Do not you have an account yet?</p>
      <Link href={"/register"}>
        <a className="text-teal-900 font-medium text-sm" href="register">
          Click here!
        </a>
      </Link>
    </section>
  );
}

export { Login };
