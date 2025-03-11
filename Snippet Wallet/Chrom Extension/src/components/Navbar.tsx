import clsx from "clsx";
import { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { chromeInstance } from "../utils/backend";
const navOptions = ["Saved Snippet", "Pinned Snippet"];

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  return (
    <div className="w-[100svw] p-2 border-b-primary border-b flex flex-col transition-all duration-150">
      <div className="flex items-center justify-between w-full">
        <img src="/logo.png" alt="" className="w-[150px]" />
        <div
          className="transition-all active:rotate-45"
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          {isNavOpen && <FaX className="size-8" />}
          {!isNavOpen && <FaBars className="size-8" />}
        </div>
      </div>

      <div
        className={clsx(
          "transition-all duration-200 mt-4 flex flex-col gap-2",
          isNavOpen ? "flex flex-col" : "hidden"
        )}
      >
        {navOptions?.map((option, index) => (
          <p
            key={index}
            className="text-center py-3 cursor-pointer  hover:shadow-lg border rounded-md border-gray-200"
          >
            {option}
          </p>
        ))}

        {loggedIn && (
          <button
            className="flex justify-center items-center gap-4 p-4 text-red-500 border-red-500 border"
            onClick={() => {
              chromeInstance.tabs.create({
                url: "https://snippetwallet.unknownbug.tech",
              });
            }}
          >
            Logout <FaSignOutAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
