import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function InputBox({ input, setInput, handleSend }) {
  return (
    <div className="flex w-full gap-4">
      <input
        type="text"
        placeholder="Type here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input input-bordered w-full"
      />
      <button
        className="text-md btn btn-neutral flex items-center gap-2"
        onClick={handleSend}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
        Send
      </button>
    </div>
  );
}
