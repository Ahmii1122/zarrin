import { Link } from "react-router-dom";
import highlight from "../../assets/highlightimg.jpg";
import usePosts from "../../hooks/useposts";
const Highlight = () => {
  const { recentPost } = usePosts();
  const truncatedContent =
    (recentPost?.content?.length ?? 0) > 100
      ? recentPost?.content?.slice(0, 100) + "..."
      : recentPost?.content;
  return (
    <section className="max-w-contained mx-auto p-6 md:p-12">
      <div className="relative rounded-xl shadow-lg lg:shadow-none lg:pb-32">
        <img
          src={highlight}
          alt="Highlight"
          className="w-full aspect-[10/4.6] object-cover rounded-xl "
        />
        <div className="lg:absolute bottom-0 right-0 w-full lg:w-[70%] max-w-[1024px ] mx-auto bg-white  p-6 md:p-10 rounded-xl shadow-md">
          <div className="flex items-center gap-6 mb-6">
            <p>{recentPost?.categoryName}</p>
            <p>{recentPost?.publishedAt}</p>
          </div>
          <h2 className="font-bold text-2xl md:text-3xl mb-3">
            {recentPost?.title}
          </h2>
          <p className="text-gray-700 mb-5">{truncatedContent}</p>
          <Link to={`/blogdetail/${recentPost?.id}`}>
            <button className="text-purple-600 border border-purple-600  rounded-lg text-sm font-medium hover:bg-purple-600 hover:text-white transition py-2 px-6">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
