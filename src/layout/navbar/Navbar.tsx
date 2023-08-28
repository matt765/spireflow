// import MoonLineIcon from "remixicon-react/MoonLineIcon";
import { useEffect, useState } from "react";

import { EnglishIcon } from "../../assets/icons/EnglishIcon";
import { LoginModal } from "../../components/loginForm/LoginModal";
import { useLoginStore } from "../../store/loginStore";
import { Logo } from "../sideMenu/Logo";
import { SignUpModal } from "../../components/loginForm/SignUpModal";
import { useSession, signOut } from "next-auth/react";
import { SpinnerIcon } from "../../assets/icons/Spinner";
import { UserIcon } from "../../assets/icons/UserIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";

export const Navbar = () => {
  const { user, setUser, loading, initializeUser } = useLoginStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = useSession();
  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();

    localStorage.removeItem("user");
    setUser(null);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const handleLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const switchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById("navbar-dropdown");
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between fixed h-20 bg-white w-full z-30 border-b border-solid border-gray-200 pr-12">
      <div className="w-[200px] xl:w-[260px] pr-4 border-r ml-[1px]">
        <Logo />
      </div>
      <div className="flex justify-end items-center gap-6 relative">
        <EnglishIcon />
        {loading ? (
          <SpinnerIcon />
        ) : (
          <>
            {user || session?.user?.name ? (
              <button
                onClick={handleDropdownClick}
                className="w-10 h-10 rounded-full border border-neutral-300 p-2"
              >
                <UserIcon />
              </button>
            ) : (
              <button
                onClick={handleLoginButton}
                className="border border-gray-300 rounded-xl w-40 h-10 flex justify-center text-white items-center font-medium font-['Inter'] bg-[#6F6AF8]"
              >
                Sign In
              </button>
            )}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-76 px-2 bg-white border rounded shadow"
                id="navbar-dropdown"
              >
                <div className="pr-2 py-2 flex">
                  <div className="w-6 flex justify-center items-center mr-3 ">
                    <MailIcon />
                  </div>
                  {user?.email || session?.user?.email || "Email"}
                </div>
                <div className="pr-2 py-2 flex pl-1">
                  <div className="w-6 flex justify-center items-center mr-2 ">
                    <LogoutIcon />
                  </div>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {isLoginModalOpen && (
        <LoginModal
          closeModal={closeLoginModal}
          switchToSignUp={switchToSignUp}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          closeModal={closeSignUpModal}
          switchToSignIn={switchToSignIn}
        />
      )}
    </div>
  );
};
