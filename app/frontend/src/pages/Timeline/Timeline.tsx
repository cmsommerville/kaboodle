import React, { useState, useMemo } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchAllUsers, fetchUser, fetchPostsByPage } from "./queries";

import AppButton from "@/components/AppButton";
import MentionsTextarea from "@/components/MentionsTextarea";
import Post, { MessageWithHandles } from "@/components/Post";
import { User } from "@/types/User";

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState<User[]>([]);
  const [prompt, setPrompt] = useState("");

  const {
    isLoading: isLoading_UserList,
    isError: isError_UserList,
    data: users,
  } = useQuery("fetchAllUsers", fetchAllUsers);

  const {
    isLoading: isLoading_User,
    isError: isError_User,
    data: user,
  } = useQuery(["fetchUser", 1], () => fetchUser(1));

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsByPage,
    getNextPageParam: (lastPage, pages) => lastPage.next_page,
  });

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
          model_code: "",
          orig_prompt_text: prompt,
          feedback_text: "",
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

  const userList = useMemo(() => {
    if (!users) return [];
    return users.map((u) => ({
      id: u.user_id,
      display: u.user_code,
    }));
  }, [users]);

  const onMention = (id: number | string) => {
    if (!users) return;
    const _user = users.find((u) => u.user_id === id);
    if (_user) {
      setRecipients((prev) => [...prev.filter((p) => p.user_id !== id), _user]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <Post user={user}>
          <>
            <MentionsTextarea
              id="comment"
              name="comment"
              userList={userList}
              placeholder="Say something nice about your coworkers!"
              value={prompt}
              onChange={setPrompt}
              onMention={onMention}
            />
            <div className="mt-4 flex justify-end">
              <AppButton onClick={onSave} isLoading={isLoading}>
                Post
              </AppButton>
            </div>
          </>
        </Post>

        {data
          ? data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.posts.map((post) => (
                  <Post user={post.author} key={post.feedback_id}>
                    <p>
                      <MessageWithHandles
                        message={post.orig_prompt_text}
                        recipients={post.recipients}
                      />
                    </p>
                  </Post>
                ))}
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

export default Feedback;
