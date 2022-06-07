import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@context/auth";

function MenuHeader({ setIsActive }: IProps) {
  const [Log, setLog] = useState({
    href: "login",
    name: "Login",
  });

  const {
    auth: { isLogin, setIsLogout, isLogout },
    permit: { removeAuth },
  } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
      setLog({ href: "/", name: "Logout" });
      setIsLogout(true);
    } else {
      setLog({ href: "/login", name: "Login" });
    }
  }, [isLogin]);

  const handleLink = () => {
    setIsActive(false);
    if (isLogout) {
      removeAuth();
    }
  };

  return (
    <div className="bg-teal-500 absolute top-16 right-0 w-full sm:w-6/12 text-center flex flex-col z-10">
      <button className="h-8 mr-2 text-white/80 hover:text-white">
        <Link href={"/about"}>about</Link>
      </button>
      <button
        className="h-8 mr-2 text-white/80 hover:text-white"
        onClick={handleLink}
      >
        <Link href={`${Log.href}`}>{`${Log.name}`}</Link>
      </button>
    </div>
  );
}

interface IProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export { MenuHeader };
