import { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="flex justify-center flex-col items-center">
        <p className="mb-4">&copy; Moodwave.ai</p>
        <div className="flex text-xl justify-center gap-5">
          <a href="https://www.instagram.com/vthacks/?hl=en" target="_blank">
            <BsInstagram />
          </a>
          <a href="https://www.facebook.com/vthacks/" target="_blank">
            <FaFacebookSquare />
          </a>
          <a href="https://vthacks.com/" target="_blank">
            <BsGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
