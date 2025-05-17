import SubscribeSec from "../../components/SubscribeSec";
import HeroSection from "./HeroSection";
import Highlight from "./Highlight";
import PostsView from "./PostsView";
import RecentPostSec from "./RecentPostSec";
const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <Highlight />
      <RecentPostSec />
      <PostsView />
      <SubscribeSec />
    </>
  );
};

export default LandingPage;
