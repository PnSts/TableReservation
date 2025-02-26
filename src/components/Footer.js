import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { HashLink } from "react-router-hash-link";
import logoWhiteSquare from "../assets/logo_white_square.png";
import "./footer.css";

const socials = [
  { icon: faFacebook, name: "facebook" },
  { icon: faInstagram, name: "instagram" },
  { icon: faTwitter, name: "twitter" },
  { icon: faLinkedin, name: "linkedin" },
];


const Footer = ({ navLinks }) => {
  return (
    <footer>
      <div>
        <img
        className="footer-logo"
        src={logoWhiteSquare}
        alt="Little Lemon"
      />
      </div>
      <div>
      <nav className="footer-nav">
        <h4>Sitemap</h4>
        <ul>
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <HashLink to={navLink.path}>{navLink.name}</HashLink>
            </li>
          ))}
        </ul>
      </nav>
      </div>
      <div className="footer-contact">
        <h4>Contact us</h4>
        <address><FontAwesomeIcon icon={faLocationDot} size="1x" /> 111 Street, New Town</address>
        <address><FontAwesomeIcon icon={faPhone} size="1x" /> (308) 804 7885</address>
        <address>
          <a href="mailto: info@littlelemon.com"
            target="_blank"
            rel="noreferrer">
            <FontAwesomeIcon icon={faEnvelope} size="1x" /> info@littlelemon.com
          </a>
        </address>
      </div>
      <div className="footer-social">
        <h4>Connect with us</h4>
        {socials.map((social, index) => (
          <a
            key={index}
            href={`https://www.${social.name}.com`}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={social.icon} size="lg" />
          </a>
        ))}
      </div>
    </footer>

  );
};
export default Footer;
