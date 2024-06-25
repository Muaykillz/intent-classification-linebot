import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import IntentItem from "./item/IntentItem";
import IntentItemSkeleton from "./item/IntentItemSkeleton";
import AlertMessage from "./alert/AlertMessage";

function IntentList({ newIntent, setNewIntent }) {
  const [intents, setIntents] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const endRef = useRef(null);

  async function fetchIntents() {
    try {
      const response = await axios.get(`${BASE_URL}/intents`);
      setIntents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch intents", error);
      showAlert("error", "Failed to fetch intents");
      setIsLoading(false);
    }
  }

  const handleDeleteIntent = async (intentId) => {
    try {
      await axios.delete(`${BASE_URL}/intents/${intentId}`);
      setIntents((prevIntents) =>
        prevIntents.filter((intent) => intent.id !== intentId),
      );
      setAlert({ type: "success", message: "Intent deleted successfully!" });
    } catch (error) {
      console.error("Failed to delete intent", error);
      setAlert({ type: "error", message: "Failed to delete intent" });
    }
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleSaveIntent = async (updatedIntent) => {
    console.log("Updated intent", updatedIntent);
    try {
      if (updatedIntent.isNew) {
        delete updatedIntent.isNew;
        delete updatedIntent.id;
        const response = await axios.post(`${BASE_URL}/intents`, updatedIntent);
        console.log("Response", response.data);
        setIntents((prevIntents) => {
          // Remove the empty intent and add the new intent
          return prevIntents
            .filter(
              (intent) =>
                !(
                  intent.isNew &&
                  !intent.name &&
                  !intent.response &&
                  intent.examples.length === 0
                ),
            )
            .concat(response.data);
        });
      } else {
        await axios.put(
          `${BASE_URL}/intents/${updatedIntent.id}`,
          updatedIntent,
        );
        setIntents((prevIntents) =>
          prevIntents.map((intent) =>
            intent.id === updatedIntent.id ? updatedIntent : intent,
          ),
        );
      }
      showAlert("success", "Intent saved successfully!");
    } catch (error) {
      console.error("Failed to save intent", error);
      showAlert("error", "Failed to save intent");
    }
  };

  const showAlert = (type, message) => {
    console.log("Alert", type, message);
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  useEffect(() => {
    fetchIntents();
  }, []);

  useEffect(() => {
    if (newIntent) {
      setIntents((prevIntents) => [...prevIntents, newIntent]);
      setNewIntent(null);
      setTimeout(() => {
        if (endRef.current) {
          endRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [newIntent, setNewIntent]);

  return (
    <div className="flex flex-col gap-4">
      <AlertMessage type={alert.type} message={alert.message} />

      {isLoading ? (
        <>
          <IntentItemSkeleton />
          <IntentItemSkeleton />
          <IntentItemSkeleton />
        </>
      ) : intents.length > 0 ? (
        intents.map((intent) => (
          <IntentItem
            key={intent.id}
            intent={intent}
            onDelete={() => handleDeleteIntent(intent.id)}
            onSave={handleSaveIntent}
          />
        ))
      ) : (
        <div className="text-center text-base-content">No intents found :(</div>
      )}
      <div ref={endRef}></div>
    </div>
  );
}

export default IntentList;
