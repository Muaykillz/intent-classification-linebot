import React, { useState, useRef, useCallback } from "react";
import Layout from "../components/Layout";
import InputBox from "../components/Classify/InputBox";
import Response from "../components/Classify/Response";
import ResponseSkeleton from "../components/Classify/ResponseSkeleton";
import axios from "axios";
import { BASE_URL } from "../config";

function Classify() {
  const [isSent, setIsSent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [input, setInput] = useState("");
  const [intentName, setIntentName] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSend = useCallback(async () => {
    setIsSent(false);
    setIsSuccess(false);
    setIsSent(true);
    try {
      const response = await axios.post(`${BASE_URL}/classify`, {
        text: input,
      });
      setIntentName(response.data.name);
      setResponseText(response.data.response);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to classify", error);
    }
  }, [input]);

  return (
    <>
      <Layout>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="ml-4 flex gap-2 text-3xl font-bold">Classify</h1>
        </div>
        <div className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-4 self-center">
          {/* for input */}
          <InputBox input={input} setInput={setInput} handleSend={handleSend} />

          {/* for response */}
          {isSent &&
            (isSuccess ? (
              <Response intentName={intentName} responseText={responseText} />
            ) : (
              <ResponseSkeleton />
            ))}
        </div>
      </Layout>
    </>
  );
}

export default Classify;
