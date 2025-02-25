import React from "react";
import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faLinkedin,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const sections = [
  { aName: "Home", urlName: "home", sectionName: "home" },
  { aName: "About", urlName: "about", sectionName: "about" },
  { aName: "Menu", urlName: "menu", sectionName: "menu" },
  { aName: "Reservations", urlName: "reservations", sectionName: "reservations" },
  { aName: "Order online", urlName: "order_online", sectionName: "order_online" },
  { aName: "Login", urlName: "login", sectionName: "login" },
];

const handleClick = (anchor) => () => {
  const id = `${anchor}-section`;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const Footer = () => {
  return (
    <Box backgroundColor="#495E57">
      <footer>
        <Flex
          margin="0 auto"
          px={50}
          gap={40}
          py={8}
          color="white"
          justifyContent="center"
          alignItems="flex-start"        
        >
          
            <Box>
              <Image src={"logo_white_square.png"} title="logo_header" alt="Little Lemon" height="250px" />
            </Box>
            <Box>
              <p className="yellowLemon markaziText">Doormat Navigation</p>
              <nav>
                <VStack spacing={2} align={faAlignLeft}>
                  {sections.map((section, index) => (
                    <a
                      className="karlaText"
                      key={index}
                      href={`/#${section.urlName}`}
                      onClick={handleClick(section.sectionName)}
                    >
                      {section.aName}
                    </a>
                  ))}
                </VStack>
              </nav>
            </Box>
            <Box>
              <p className="yellowLemon markaziText">Contact</p>
              <nav className="karlaText">
                <VStack spacing={2} align={faAlignLeft}>
                  <span><u>Address</u></span>
                  <span>111 Street, New Town</span>
                  <span><u>Telephone</u></span>
                  <span>(+308) 804 7885</span>
                  <span><u>Email</u></span>
                  <a href="mailto: info@littlelemon.com"
                    target="_blank"
                    rel="noreferrer"><FontAwesomeIcon icon={faEnvelope} size="1x" />info@littlelemon.com</a>
                </VStack>
              </nav>
            </Box>
            <Box>
              <p className="yellowLemon markaziText">Social Media</p>
              <nav className="karlaText">
                <VStack spacing={2}>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="1x" />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="1x" />
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="1x" />
                  </a>
                </VStack>
              </nav>
            </Box>
        </Flex>
      </footer>
    </Box >
  );
};
export default Footer;
