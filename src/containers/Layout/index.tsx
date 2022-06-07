import React from "react";
import { Header } from "@containers/Header";
import { Footer } from "@containers/Footer";

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

interface IProps {
  children: React.ReactNode;
}

export { Layout };
