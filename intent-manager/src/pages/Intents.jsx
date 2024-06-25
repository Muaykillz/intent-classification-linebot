import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import IntentList from "../components/Intent/IntentList";
import { PlusIcon } from "@heroicons/react/24/outline";

function Intents() {
  const [newIntent, setNewIntent] = useState(null);
  const intentListRef = useRef(null);

  const handleCreateIntent = () => {
    const newIntent = {
      id: "",
      name: "",
      examples: [],
      response: "",
      isNew: true,
    };
    setNewIntent(newIntent);
    setTimeout(() => {
      if (intentListRef.current) {
        intentListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <Layout>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="ml-4 flex gap-2 text-3xl font-bold">Intents</h1>
          <button
            className="text-md btn btn-neutral flex w-40 items-center justify-center gap-2"
            onClick={handleCreateIntent}
          >
            <PlusIcon className="h-6 w-6" />
            Create Intent
          </button>
        </div>

        <div ref={intentListRef}>
          <IntentList newIntent={newIntent} setNewIntent={setNewIntent} />
        </div>
      </Layout>
    </>
  );
}

export default Intents;
