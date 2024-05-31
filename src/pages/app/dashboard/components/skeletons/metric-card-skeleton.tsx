import { Skeleton } from "@/common/components/ui/skeleton";

export interface MetricCardSkeletonProps {

}

export function MetricCardSkeleton(props: MetricCardSkeletonProps) {
  return (
    <>
      <Skeleton className="h-7 w-36 mt-1" />
      <Skeleton className="h-4 w-52" />
    </>
  );
}