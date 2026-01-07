import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useHomePage from "../Zustand/homePage";
import { FaBars, FaChevronLeft, FaHamburger } from "react-icons/fa";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn, signOut } = useClerk();

  const navigate = useNavigate();


  const HandleNavigate = () => {
    navigate("/home");
  };

  

  const { setIsOpen } = useHomePage();

  const isOpen = useHomePage((p) => p.isOpen);

  const HandleClose = (e) => {
    e.stopPropagation()
    setIsOpen(true);
  };
  return (
    <nav className="p-4 z-30 flex justify-between items-center border-b border-solid bg-black fixed top-0 left-0 right-0 border-gray-700">
      <div
        
        className="text-xl flex justify-center items-center gap-4 relative select-none cursor-pointer font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-blue-600"
      >
        <div onClick={HandleNavigate}> 
        My-Roadmap
        </div>
        <FaBars
          onClick={HandleClose}
          className={ `rounded-full font-light  `}
          color="gray"
          size={"1.3rem"}
        />
      </div>

      <div>
        <SignedOut>
          <button
            onClick={openSignIn}
            className="bg-gray-800 p-2 rounded px-2 md:px-6 cursor-pointer"
          >
            Sign In | Register
          </button>
        </SignedOut>
        <SignedIn>
          {user ? (
            <div className="flex justify-center items-center gap-1 text-sm font-semibold text-gray-500 select-none cursor-default">
              {user?.fullName} <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div>Loading..</div>
          )}
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
