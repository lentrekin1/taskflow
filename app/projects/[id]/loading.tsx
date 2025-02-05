export default function Loading() {
  return (
    <div className="animate-pulse space-y-8">
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between items-start">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-96 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 