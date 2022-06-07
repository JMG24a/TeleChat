import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { MenuHeader } from "@components/MenuHeader";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();
  const rout = router.asPath !== "/" ? "/dashboard" : "/";
  const handleMenu = () => {
    setIsActive(!isActive);
  };

  const handleHome = () => {
    setIsActive(false);
  };

  return (
    <nav className="bg-teal-600 w-full flex flex-row h-16 justify-between relative">
      <ul className="w-full flex justify-around h-16 items-center">
        <li className="text-white/90 font-bold text-xl">
          <Link href={`${rout}`}>
            <a href={`${rout}`} onClick={handleHome}>
              Telechat
            </a>
          </Link>
        </li>
        <li>
          <BiMenuAltLeft
            color="white"
            cursor={"pointer"}
            size={40}
            onClick={handleMenu}
          />
        </li>
        {isActive && <MenuHeader setIsActive={setIsActive} />}
      </ul>
    </nav>
  );
}

export { Header };
