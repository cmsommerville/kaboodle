import { useState, useEffect, useMemo } from "react";
import AppPanel from "@/components/AppPanel";
import AppButton from "@/components/AppButton";
import { ChatGPTResponse, User } from "./types";
import { UserIcon } from "@heroicons/react/24/outline";
import { MentionsInput, Mention } from "react-mentions";
import css from "./mentions.module.css";

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [recipients, setRecipients] = useState<User[]>([]);
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

  const validateMentions = (_recipients: User[], message: string) => {
    return new Set(
      _recipients
        .filter((r) => {
          return message.includes(`@{${r.user_code}}`);
        })
        .map((r) => r.user_id)
    );
  };

  const onSave = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const _recipients = validateMentions(recipients, prompt);

      const res = await fetch("/api/crud/feedback", {
        method: "POST",
        body: JSON.stringify({
          author_id: 2,
          recipients: [..._recipients].map((r) => {
            return {
              recipient_id: r,
            };
          }),
          model_code: response ? response.model : "",
          orig_prompt_text: prompt,
          feedback_text: cleanedPrompt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("/api/crud/user/1", { signal })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });

    fetch("/api/crud/users", { signal })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const userList = useMemo(() => {
    return users.map((u) => ({
      id: u.user_id,
      // display: `${u.first_name} ${u.last_name}`,
      display: u.user_code,
    }));
  }, [users]);

  const onMention = (id: number | string) => {
    const _user = users.find((u) => u.user_id === id);
    if (_user) {
      setRecipients((prev) => [...prev.filter((p) => p.user_id !== id), _user]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <AppPanel>
        <div className="flex flex-col text-gray-600 space-y-3">
          {user ? (
            <div className="flex space-x-3">
              {user.avatar ? (
                <img
                  src={`/assets/${user.avatar}`}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                />
              ) : (
                <div className="h-12 w-12 rounded-full ring-2 ring-gray-200 p-2 bg-gray-200 text-gray-400">
                  <UserIcon />
                </div>
              )}
              <div>
                <h4 className="text-md font-semibold">{`${user.first_name} ${user.last_name}`}</h4>
                <p className="text-xs text-gray-300">February 28, 2023</p>
              </div>
            </div>
          ) : (
            <></>
          )}

          <MentionsInput
            id="comment"
            name="comment"
            placeholder="Say something nice about your coworkers!"
            value={prompt}
            onChange={(e: any) => setPrompt(e.target.value)}
            className="mentions"
            classNames={css}
          >
            <Mention
              className={css.mentions__mention}
              trigger="@"
              data={userList}
              markup={"@{__display__}"}
              onAdd={onMention}
              displayTransform={(id: string, display: string) => `@${display}`}
            />
          </MentionsInput>

          <div className="mt-4 flex justify-end">
            <AppButton onClick={onSave} isLoading={isLoading}>
              Post
            </AppButton>
          </div>
        </div>
      </AppPanel>
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
              <AppButton onClick={onSubmitPrompt} isLoading={isLoading}>
                Post
              </AppButton>
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
