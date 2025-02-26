import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "../assets/logo_coloured_inline.jpg";
import "./header.css";
import { Link } from "react-router-dom";


const sections = [
    { aName: "Home", urlName:"home", sectionName: "home" },
    { aName: "About", urlName:"about", sectionName: "about" },
    { aName: "Menu", urlName:"menu", sectionName: "menu" },
    { aName: "Reservations", urlName:"reservations", sectionName: "reservations" },
    { aName: "Order online", urlName:"order_online", sectionName: "order_online" },
    { aName: "Login", urlName:"login", sectionName: "login" },
];



const Header = ({ navLinks }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

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

  // const handleClick = (anchor) => () => {
  //   const id = `${anchor}-section`;
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };
  
  return (
    <header>
      <nav className="container grid nav-bar">
        <HashLink className="nav-bar-logo" to="/">
          <img src={logoImage} alt="Little Lemon logo"/>
        </HashLink>
        <button
          className="nav-bar-hamburger"
          type="button"
          aria-label="On Click"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          {isNavExpanded ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        <ul
          className={isNavExpanded ? "nav-bar-links expanded" : "nav-bar-links"}
        >
          {navLinks.map((navLink) => (
            <li
              key={navLink.name}
              onClick={() => setIsNavExpanded(false)}
              aria-label="On Click"
              className="hover-underline-animation"
            >
              {navLink.hashLink ? (
                <HashLink to={navLink.path}>{navLink.name}</HashLink>
              ) : (
                <Link to={navLink.path}>{navLink.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  //   <Box
  //     ref={headerRef}
  //     position="fixed"
  //     top={0}
  //     left={0}
  //     right={0}
  //     transform="translateY(0)"
  //     transitionProperty="transform"
  //     transitionDuration=".3s"
  //     transitionTimingFunction="ease-in-out"
  //     backgroundColor="#FFFFFF"
  //     zIndex={1000}
  //   >
  //     <Box color="black" maxWidth="1280px" margin="0 auto">
  //       <HStack
  //         px={16}
  //         py={6}
  //         justifyContent="space-between"
  //         alignItems="center"
  //       >

  //         <Image src={"logo_coloured_inline.jpg"} title="Little Lemon logo" alt="Little Lemon" height="60px"/>
  //         <nav >
  //           <ul>
  //           {/* <HStack spacing={8}> */}
  //             {sections.map((section, index) => (
  //               <li key={index}>
  //                 <a 
  //                   className="karlaText"
  //                   key={index}
  //                   href={`/#${section.urlName}`}
  //                   onClick={handleClick(section.sectionName)}
  //                 >
  //                   {section.aName}
  //                 </a>
  //               </li>
  //             ))}
  //           {/* </HStack> */}
  //           </ul>
  //         </nav>
  //       </HStack>
  //     </Box>
  //   </Box>
  );
};
export default Header;