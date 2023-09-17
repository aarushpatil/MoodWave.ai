import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import moodwave from "../images/moodwave2.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [Nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!Nav);
  };

  return (
    <div className="text-[#F2EEE4]">
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/Generator">Generator</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {Nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <div
        className={
          Nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 pt-3 ease-in-out duration-500 z-50 md:hidden"
            : "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 pt-3 ease-in-out duration-500 z-50 md:hidden"
        }
      >
        <img
          src={moodwave}
          alt="moodwave"
          className=" max-w-10 max-h-20 pl-2"
        />

        <ul className=" uppercase">
          <li className="p-4  border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/Generator">Generator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
