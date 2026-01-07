import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn, signOut } = useClerk();

  console.log(user)
  return (
    <nav className="p-4 z-30 flex justify-between items-center border-b border-solid bg-black fixed top-0 left-0 right-0 border-gray-700">
      <div className="text-xl select-none font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-blue-600">
        MY ROADMAP
      </div>

      <div>
        <SignedOut>
          <button onClick={openSignIn} className="bg-gray-800 p-2 rounded px-2 md:px-6 cursor-pointer">
            Sign In | Register
          </button>
        </SignedOut>
         <SignedIn>
      {
        user ?
         
         <div className="flex justify-center items-center gap-1 text-sm font-semibold text-gray-500 select-none cursor-default">
             {user?.fullName} <UserButton afterSignOutUrl="/"  />   
         </div>
        :
        <div>
          Loading..  
        </div>
      }
      </SignedIn> 
      </div>
    </nav>
  );
};

export default Navbar;
