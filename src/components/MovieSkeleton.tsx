export default function MovieSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-2xl overflow-hidden">
        <div className="bg-gray-700 aspect-2/3"></div>
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}