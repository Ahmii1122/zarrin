import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Update active state based on the current path
  useEffect(() => {
    // Reset to null on the home page
    if (location.pathname === "/") {
      setActive(null);
    } else {
      const activeLink = links.find((link) =>
        location.pathname.includes(link.link)
      );
      if (activeLink) {
        setActive(activeLink.name);
      }
    }
  }, [location]);

  return (
    <div className="max-w-contained mx-auto p-4 md:px-24">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="relative md:hidden">
          <HiMiniBars3BottomRight
            className="size-10"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute justify-between items-center right-0 mt-2 w-48 bg-white shadow-lg p-4 flex flex-col gap-4 z-50">
              <ul>
                {links.map((link) => (
                  <Link to={link.link} key={link.name}>
                    <li
                      className={`cursor-pointer flex mt-4 ${
                        active === link.name ? "text-primary" : "text-tblack"
                      }`}
                      onClick={() => {
                        setActive(link.name);
                        setIsOpen(false); // Close the menu when a link is clicked
                      }}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
              <CiSearch className="text-2xl" />
              <button className="bg-primary px-4 py-2 rounded-md whitespace-nowrap">
                Contact Us
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:flex justify-between items-center gap-12 flex-row">
          <ul className="flex flex-row gap-12">
            {links.map((link) => (
              <Link to={link.link} key={link.name}>
                <li
                  className={`font-raleway font-medium text-base ${
                    active === link.name ? "text-primary" : "text-tblack"
                  }`}
                  onClick={() => setActive(link.name)}
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
          <CiSearch className="text-2xl" />
          <button className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const links = [
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
  // Add more links here
];
