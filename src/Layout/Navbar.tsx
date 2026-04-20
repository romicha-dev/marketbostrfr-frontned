import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { logout, selectUser } from "@/store/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommonWrapper from "@/common/CommonWrapper";
// import LanguageSelect from "./LanguageSelect";
// import Login from "./../pages/Login";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector(selectUser);
  console.log("user", user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/rates", label: "Rates" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  // 👉 outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={dropdownRef} className="bg-[#155DFC] shadow-lg sticky top-0 z-50">
      <CommonWrapper>
        <div className="mx-auto">
          <div className="flex items-center justify-between h-12 md:h-16">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold">
              <img 
                src="/navLogo.png" 
                alt="Logo" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu  */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-2 text-sm lg:text-base font-semibold leading-[120%] transition font-arima whitespace-nowrap
        ${
          isActive
            ? " text-[#F0B100] border-b-2 border-white"
            : "text-white hover:text-[#F0B100] hover:border-white"
        }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Side - Login Button এবং Language Selector */}
            <div className="flex gap-2 md:gap-3 items-center">
              {/* <LanguageSelect /> */}
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 md:px-7 py-1.5 md:py-2.5 border border-white hover:bg-blue-700 rounded-md text-white text-sm md:text-base font-medium font-inter leading-[120%] cursor-pointer whitespace-nowrap"
              >
                Login
              </button>

             
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none ml-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

      
        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="mt-3 bg-white text-[#155DFC] w-full hover:bg-gray-100"
              >
                Logout
              </Button>
            )}
          </div>
        )}
      </CommonWrapper>
    </nav>
  );
};

export default Navbar;