import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div>
        <Skeleton width={400} height={360} />
        <Skeleton width={400} height={40} />
        <Skeleton width={400} height={40} />
        <Skeleton width={400} height={40} />
      </div>
    </div>
  );
};

export default CardSkeleton;
