import logo from "../assets/logo.png";
import fb from "../assets/Dribbble.png";
import ig from "../assets/behance.png";
import ln from "../assets/Instagram.png";
import yt from "../assets/twitter.png";

const footer = () => {
  return (
    <div className="max-w-contained mx-auto p-4 md:px-24  ">
      <div className="flex flex-col items-center mt-12">
        <div className="text-2xl font-bold flex items-center gap-2 justify-center mb-12">
          <img src={logo} alt="" />
        </div>
        <div className="flex font-raleway text-[16px] font-normal gap-12">
          {links.map((link) => (
            <a href={link.link} key={link.name}>
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-10">
          <img src={fb} alt="" />
          <img src={ig} alt="" />
          <img src={ln} alt="" />
          <img src={yt} alt="" />
        </div>
        <hr className="w-full md:w-[90%] border-t-1 px-0 border-t-primary my-12" />
        <p className="font-raleway text-[16px] font-normal mb-14">
          Copyright Ideapeel Inc © 2023. All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default footer;

const links = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
];
