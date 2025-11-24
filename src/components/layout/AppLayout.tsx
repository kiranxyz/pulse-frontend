import { type ReactNode, useState } from "react";

import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Header
        openLoginModal={() => setShowLogin(true)}
        openRegisterModal={() => setShowRegister(true)}
      />

      {showLogin && (
        <LoginModal
          close={() => setShowLogin(false)}
          openRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          close={() => setShowRegister(false)}
          openLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      <main>{children}</main>
    </>
  );
}
