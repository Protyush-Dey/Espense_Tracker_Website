import logo from "../assets/Images/icon/logo.png";
import logout from "../assets/Images/icon/logout.png";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useUser } from "../context/user";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {user} = useUser();
  return (
    <>
      <nav className=" fixed top-0 left-0 w-full z-50 min-h-20 bg-[#F7F8FA] shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] hidden md:flex justify-between items-center px-6 lg:px-8 ">
        <div className="flex items-center justify-center xl:gap-12 lg:gap-8 gap-3">
          <div className="flex gap-2 lg:gap-3 items-center xl:text-3xl lg:text-2xl text-xl  font-medium">
            <img
              src={logo}
              alt="Logo"
              className="max-w-12 max-h-12 min-w-6 min-h-6 xl:h-10 lg:h-8 h-7"
            />
            <h1>Spendly</h1>
          </div>
          <ul className="flex x:gap-8 lg:gap-5 gap-2 xl:text-xl text-[16px] font-medium">
            <li className=" text-black cursor-pointer">Dashboard</li>
            <li className=" text-gray-500 cursor-pointer">Friends</li>
            <li className=" text-gray-500 cursor-pointer">Expnses</li>
            <li className=" text-gray-500 cursor-pointer">Account</li>
          </ul>
        </div>
        <div className="flex items-center justify-center xl:gap-10 lg:gap-7 gap-4 xl:text-2xl text-xl">
          <p>
            Welcome, <span className="font-medium">{user?.fullName}</span>
          </p>
          <button className="flex items-center justify-center gap-2 h-8 rounded-lg cursor-pointer shadow-button bg-[#F1F5F9] hover:bg-[#eceef1] p-2 lg:px-4 text-[10px] lg:text-lg">
            <img src={logout} alt="icon" className="lg:h-4 h-3 " />
            <p>Logout</p>
          </button>
        </div>
      </nav>

      {/* hamburger  */}
      <nav className=" fixed top-0 left-0 w-full z-50 min-h-15 bg-[#f7f8fa] shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] md:hidden flex justify-between items-center px-6 lg:px-8 ">
        <div className="flex items-center justify-center xl:gap-12 lg:gap-8 gap-3">
          <div className="flex gap-2 lg:gap-3 items-center xl:text-3xl lg:text-2xl text-xl  font-medium">
            <img
              src={logo}
              alt="Logo"
              className="max-w-12 max-h-12 min-w-6 min-h-6 xl:h-10 lg:h-8 h-7"
            />
            <h1>Spendly</h1>
          </div>
        </div>
        <button
          className="flex items-center justify-center rounded-lg cursor-pointer shadow-button bg-[#F1F5F9] hover:bg-[#eceef1] py-2 h-8 w-8"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* plate */}
        <div
          className={`fixed inset-0 z-20 bg-gray-600/70 transition-opacity duration-300 md:hidden ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 z-30 h-screen w-3/4 max-w-xs bg-blue-400/70 flex flex-col items-center py-10 px-6 gap-10 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className=" flex gap-6 text-black text-2xl font-bold mb-15">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1>Spendly</h1>
          </div>
          <ul className="flex flex-col items-center gap-10 text-xl font-semibold">
            <li className=" text-white cursor-pointer">Dashboard</li>
            <li className=" text-white cursor-pointer">Friends</li>
            <li className=" text-white cursor-pointer">Expnses</li>
            <li className=" text-white cursor-pointer">Account</li>
          </ul>
          <button className="flex items-center justify-center gap-2 h-8 rounded-lg cursor-pointer shadow-button bg-[#F1F5F9] hover:bg-[#eceef1] p-2 text-lg w-1/2">
            <img src={logout} alt="icon" className="h-4 " />
            <p>Logout</p>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
