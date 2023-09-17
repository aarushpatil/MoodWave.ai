import { useState } from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; moodwave.ai</p>
        <div className="social-links">
          <a href="https://www.instagram.com/moodwave/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/moodwave" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.facebook.com/moodwave" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
