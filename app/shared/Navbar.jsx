"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../dashboard/layout";
import DashWlc from "../components/DashWlc";

const Navbar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Scroll down
    } else {
      setIsVisible(true); // Scroll up
    }
    setLastScrollY(window.scrollY);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScroll]);

  if (pathname.includes("dashboard"))
    return (
      <div>
        <DashWlc />
      </div>
    );

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b-2 bg-white/50 px-1 backdrop-blur-2xl transition-transform duration-300 md:px-5 lg:px-20 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          rel="noopener noreferrer"
          href={"/"}
          aria-label="Back to homepage"
          className="flex items-center p-2 text-2xl font-semibold"
        >
          Hotel Relex
        </Link>
        <ul className="hidden space-x-3 md:flex">
          <li className="">
            <Link
              rel="noopener noreferrer"
              href={"/"}
              className={`flex items-center px-4 ${
                pathname === "/" ? "text-violet-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/about"}
              className={`flex items-center px-4 ${
                pathname === "/about" ? "text-violet-600" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/rooms"}
              className={`flex items-center px-4 ${
                pathname === "/rooms" ? "text-violet-600" : ""
              }`}
            >
              Room
            </Link>
          </li>
          <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/login"}
              className={`flex items-center px-4 ${
                pathname === "/login" ? "text-violet-600" : ""
              }`}
            >
              Login
            </Link>
          </li>
          {/* <li className="flex">
            <Link
              rel="noopener noreferrer"
              href={"/dashboard"}
              className={`flex items-center px-4 ${
                pathname === "/dashboard" ? "text-violet-600" : ""
              }`}
            >
              Dashboard
            </Link>
          </li> */}
        </ul>
        <button
          className="flex justify-end p-4 md:hidden"
          onClick={handleDropdownToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-16 w-full border-t bg-white/60 text-slate-900 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col space-y-2 p-4 font-semibold">
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/"}
                className={`block px-4 py-2 ${
                  pathname === "/" ? "text-violet-600" : ""
                }`}
                onClick={() => setIsDropdownVisible(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/about"}
                className={`block px-4 py-2 ${
                  pathname === "/about" ? "text-violet-600" : ""
                }`}
                onClick={() => setIsDropdownVisible(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/rooms"}
                className={`block px-4 py-2 ${
                  pathname === "/rooms" ? "text-violet-600" : ""
                }`}
                onClick={() => setIsDropdownVisible(false)}
              >
                Room
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/login"}
                className={`block px-4 py-2 ${
                  pathname === "/login" ? "text-violet-600" : ""
                }`}
                onClick={() => setIsDropdownVisible(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                rel="noopener noreferrer"
                href={"/dashboard"}
                className={`block px-4 py-2 ${
                  pathname === "/dashboard" ? "text-violet-600" : ""
                }`}
                onClick={() => setIsDropdownVisible(false)}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
