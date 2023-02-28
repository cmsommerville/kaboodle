import { useState } from "react";
import AppPanel from "@/components/AppPanel";
import AppButton from "@/components/AppButton";
import { ChatGPTResponse } from "./types";

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<ChatGPTResponse>();
  const [cleanedPrompt, setCleanedPrompt] = useState("");

  const onSubmitPrompt = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!res.choices) throw new Error("No `choices` key in response");
      if (res.choices.length === 0)
        throw new Error("No `choices` returned in response");
      if (res.choices[0].text) {
        setResponse(res);
        setCleanedPrompt(res.choices[0].text);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async () => {
    if (!response) return;
    try {
      const res = await fetch("/api/crud/feedback", {
        method: "POST",
        body: JSON.stringify({
          author_id: 2,
          recipient_id: 1,
          model_code: response.model,
          orig_prompt_text: prompt,
          feedback_text: cleanedPrompt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <AppPanel className="col-start-1 space-y-12">
        <>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Add your feedback!
            </label>
            <div className="mt-1">
              <textarea
                rows={6}
                name="comment"
                id="comment"
                className="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <AppButton onClick={onSubmitPrompt}>Post</AppButton>
            </div>
          </div>
        </>
      </AppPanel>
      <AppPanel className="col-start-1 space-y-12">
        <>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              ChatGPT Response
            </label>
            <div className="mt-1">
              <textarea
                rows={6}
                name="comment"
                id="comment"
                className="p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                onChange={(e) => setCleanedPrompt(e.target.value)}
                value={cleanedPrompt}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <AppButton transparent={true} onClick={onSave}>
                Save
              </AppButton>
            </div>
          </div>
        </>
      </AppPanel>
    </div>
  );
};

export default Feedback;
