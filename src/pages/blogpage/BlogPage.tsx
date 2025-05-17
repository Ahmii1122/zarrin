import usePosts from "../../hooks/useposts";
import PostCard from "../../components/PostCard";
import SubscribeSec from "../../components/SubscribeSec";
const BlogPage = () => {
  const { posts } = usePosts();
  return (
    <section className="max-w-contained mx-auto mt-20 p-4 md:p-12">
      <div className="flex flex-col items-center justify-center">
        <p className="text-tgray font-raleway font-bold text-2xl text-center mb-6">
          OUR BLOGS
        </p>
        <p className="font-raleway font-bold text-5xl mb-6">
          Find our all blogs from here
        </p>
        <p className="text-tgray font-roboto text-center text-base max-w-[750px] mb-28">
          our blogs are written from very research research and well known
          writers writers so that we can provide you the best blogs and articles
          articles for you to read them all along
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <SubscribeSec />
    </section>
  );
};

export default BlogPage;
