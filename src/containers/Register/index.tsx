import React from "react";
import { Emblem } from "@components/Emblem";
import { Form } from "@components/Form/Register";
import Link from "next/link";

function Register() {
  return (
    <section className="flex justify-center flex-col w-full items-center">
      <Emblem />
      <h3 className="text-teal-900 font-bold">Register</h3>
      <Form />
      <p className="text-teal-900 font-thin">Do you already have an account?</p>
      <Link href={"/login"}>
        <a className="text-teal-900 font-medium text-sm" href="login">
          Click here!
        </a>
      </Link>
    </section>
  );
}

export { Register };
