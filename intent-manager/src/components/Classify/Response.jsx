export default function Response({ intentName, responseText }) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <h2 className="flex gap-2 text-xl font-bold">Response</h2>
        <div className="badge badge-accent badge-outline">{intentName}</div>
      </div>
      <div className="w-full rounded-md bg-gray-50 p-4">
        <h2 className="text-md font-semibold">{responseText}</h2>
      </div>
    </div>
  );
}
