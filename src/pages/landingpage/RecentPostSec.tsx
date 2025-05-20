import { Link } from "react-router-dom";
import useLatestPosts from "../../hooks/useLatestposts";

const RecentPostSec = () => {
  const { latestPosts } = useLatestPosts();
  return (
    <section className="max-w-contained mx-auto p-6 md:p-12 hidden md:block">
      <div className="flex gap-6">
        <div className="w-1/2">
          <img src={latestPosts[0]?.image} alt={latestPosts[0]?.title} />
        </div>
        <div className="w-1/2">
          <div className="flex gap-6 mt-1 mb-7">
            <p className="text-xs font-roboto font-bold">
              {latestPosts[0]?.category?.name}
            </p>
            <p className="font-roboto text-xs font-medium text-tgray2">
              {latestPosts[0]?.publishedAt}
            </p>
          </div>
          <h2 className="text-[32px] font-raleway font-bold  mb-6">
            {latestPosts[0]?.title}
          </h2>
          <p className="font-roboto text-base  font-normal text-tgray2 mb-14">
            {latestPosts[0]?.content}
          </p>
          <Link to={`/blogdetail/${latestPosts[0]?.id}`}>
            <button className="text-primary border border-primary py-[10px] px-[28px] rounded-lg font-roboto font-bold text-[18px]">
              Read More...
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPostSec;
