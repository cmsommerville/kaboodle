import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import Post from "@/components/Post";
import { fetchUser } from "./queries";

const Feedback = () => {
  const {
    isLoading: isLoading_User,
    isError: isError_User,
    data: user,
  } = useQuery(["fetchUser", 1], () => fetchUser(1));

  return (
    <Post user={user}>
      <p>Hello World</p>
    </Post>
  );
};

export default Feedback;
