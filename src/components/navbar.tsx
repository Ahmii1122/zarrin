import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { CiSearch } from "react-icons/ci";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { dologout } from "../firebase/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const navigate = useNavigate();
  const { currentUser: user } = useAuth();

  const handleLogout = async () => {
    await dologout();
    navigate("/");
  };

  useEffect(() => {
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
    <div className="max-w-contained mx-auto py-4 px-4 ">
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
            <div className="absolute  justify-between items-center right-0 mt-2 w-48 bg-white shadow-lg p-4 flex flex-col gap-4 z-50">
              <ul>
                {links.map((link) => (
                  <Link to={link.link} key={link.name}>
                    <li
                      className={`cursor-pointer flex mt-4 ${
                        active === link.name ? "text-primary" : "text-tblack"
                      }`}
                      onClick={() => {
                        setActive(link.name);
                        setIsOpen(false);
                      }}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
              <CiSearch className="text-2xl" />
              <Link to={"/contactus"}>
                <button
                  onClick={() => {
                    setActive("Contact Us");
                  }}
                  className="bg-primary px-4 py-2 rounded-md whitespace-nowrap"
                >
                  Contact Us
                </button>
              </Link>
              {user ? (
                <div className=" relative flex flex-col gap-4 items-center">
                  <Link to={"/myblogs"}>
                    <button
                      onClick={() => {
                        setActive("My Blogs");
                        setIsOpen(false);
                      }}
                      className={`bg-primary px-4 py-2 rounded-md whitespace-nowrap ${
                        active === "My Blogs"
                          ? "bg-violet-900 text-white"
                          : "text-tblack"
                      }`}
                    >
                      My Blogs
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-primary px-4 py-2 rounded-md whitespace-nowrap "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button
                    onClick={() => {
                      setActive("Login");
                      setIsOpen(false);
                    }}
                    className={` px-4 py-2 rounded-md whitespace-nowrap mt-4 ${
                      active === "Login" ? "bg-violet-900" : "text-tblack"
                    }`}
                  >
                    Login
                  </button>
                </Link>
              )}
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
          <Link to={"/contactus"}>
            <button
              onClick={() => {
                setActive("Contact Us");
              }}
              className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap"
            >
              Contact Us
            </button>
          </Link>
          {user ? (
            <div className="flex flex-row gap-12">
              <Link to={"/myblogs"}>
                <button
                  onClick={() => {
                    setActive("My Blogs");
                  }}
                  className={`bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap ${
                    active === "My Blogs" ? "bg-violet-900" : "text-tblack"
                  }`}
                >
                  My Blogs
                </button>
              </Link>
              <div
                onClick={handleLogout}
                className="flex flex-row rounded-md bg-primary p-2  gap-4 cursor-pointer"
              >
                <RiLogoutBoxRLine color="white" size={24} />
                <p className="text-white font-raleway font-medium text-base  text-center flex items-center justify-center">
                  Logout
                </p>
              </div>
            </div>
          ) : (
            location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <Link to={"/login"}>
                <button className="bg-primary text-white px-4 py-2 rounded-md whitespace-nowrap ">
                  Login
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const links = [
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
];
