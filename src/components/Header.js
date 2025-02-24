import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Image } from "@chakra-ui/react";



const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const sections = [
    { aName: "Home", urlName:"home", sectionName: "home" },
    { aName: "About", urlName:"about", sectionName: "about" },
    { aName: "Menu", urlName:"menu", sectionName: "menu" },
    { aName: "Reservations", urlName:"reservations", sectionName: "reservations" },
    { aName: "Order online", urlName:"order_online", sectionName: "order_online" },
    { aName: "Login", urlName:"login", sectionName: "login" },
];



const Header = () => {
  const headerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      if (window.scrollY > lastScrollY) {
        headerRef.current.style.transform = "translateY(-200px)";
      } else {
        headerRef.current.style.transform = "translateY(0)";
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
  
  return (
    
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform="translateY(0)"
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#FFFFFF"
      zIndex={1000}
    >
      <Box color="black" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={6}
          justifyContent="space-between"
          alignItems="center"
        >

          <Image src={"logo_coloured_inline.jpg"} title="logo_header" height="60px"/>
          <nav >
            <HStack spacing={8}>
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
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;