import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-[400px] h-[360px]" />
      <Skeleton className="w-[400px] h-[40px]" />
      <Skeleton className="w-[400px] h-[40px]" />
      <Skeleton className="w-[400px] h-[40px]" />
    </div>
  );
};

export default CardSkeleton;
