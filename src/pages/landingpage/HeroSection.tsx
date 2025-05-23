import vector from "../../assets/Vector.png";
import hero from "../../assets/heroimg.jpg";
import usePosts from "../../hooks/useposts";
import { Link } from "react-router-dom";
// import mdhero from "../../assets/mdhero.png";

const HeroSection = () => {
  const { posts } = usePosts();

  return (
    <section className="relative max-w-contained mx-auto bg-primary z-10 overflow-hidden">
      {/* Top-left vector inside hero section */}
      <img
        src={vector}
        alt="vector"
        className="absolute -top-20 left-0 lg:block hidden z-0 rounded-r-full"
      />

      {/* Bottom-right vector inside hero section */}
      <img
        src={vector}
        alt="vector"
        className="absolute -bottom-10 right-0 lg:block hidden z-0 rounded-l-full"
      />

      <div className=" flex flex-col lg:flex-row gap-12 px-6 md:px-20 lg:px-24 relative z-10">
        {/* Text content */}
        <div className="mt-32 mb-24 w-full lg:w-1/2">
          <p className="text-base font-raleway font-bold text-white">
            Featured Post
          </p>
          <p className="font-raleway font-bold text-[45px] md:text-[64px] leading-[50px] md:leading-[76px] lg:leading-[86px] text-white mt-6">
            {posts?.[0].title}
          </p>
          <p className="font-raleway font-normal text-xs md:text-base leading-[150%] text-white mt-7">
            {posts?.[0].content}
          </p>
          <Link to={`/blogdetail/${posts?.[0].id}`}>
            <button className="bg-white text-black px-12 py-4 rounded-lg mt-7 mb-5 lg:mb-44">
              Read More
            </button>
          </Link>
        </div>

        {/* Hero image */}
        <div className="mt-5 lg:mt-32 mb-24 w-full lg:w-1/2">
          <img
            src={hero}
            alt="hero"
            className="w-full  h-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
