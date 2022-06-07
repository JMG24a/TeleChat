import React from "react";
import { useRouter } from "next/router";
import { Emblem } from "@components/Emblem";

function Welcome() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <main className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Welcome to Telechat</h1>
      <p className="text-sm text-black/40">
        Talk incognito with your acquaintances
      </p>
      <Emblem />
      <p className="text-sm text-black/40 text-center">
        Encrypt your messages on the web! You never know who s interested in mom
        s secret recipes
      </p>
      <button
        className="mt-10 bg-teal-600 h-10 rounded w-16 text-white pointer"
        onClick={handleClick}
      >
        Start
      </button>
    </main>
  );
}
export { Welcome };
