export default function ResponseSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <h2 className="flex gap-2 text-xl font-bold">Response</h2>
        <div className="badge skeleton bg-gray-100 text-transparent">
          Intent Name
        </div>
      </div>
      <div className="skeleton w-full rounded-md bg-gray-100 p-4 text-transparent">
        <h2 className="text-md font-semibold">Response text</h2>
      </div>
    </div>
  );
}
