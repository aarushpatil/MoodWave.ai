import { useState } from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4">
      <div className="container mx-auto text-center footer-content">
        <p className="mb-4">&copy; moodwave.ai</p>
        <div className="social-links flex justify-center space-x-4">
          <a
            href="https://www.instagram.com/moodwave/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-150"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/moodwave"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-150"
          >
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a
            href="https://www.facebook.com/moodwave"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-150"
          >
            <i className="fab fa-facebook text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
