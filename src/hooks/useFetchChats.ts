import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetChatsBySessionIdQuery } from "../toolkit/services/chat-api";
import { setChats } from "../toolkit/slices/dashboard/chat";

export const useFetchChats = () => {
  const { chatSessionId } = useParams<{ chatSessionId: string }>();
  const dispatch = useDispatch();

  const { data, isSuccess } = useGetChatsBySessionIdQuery(chatSessionId);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setChats(data?.chats || []));
    }
  }, [data, isSuccess, dispatch]);

  return {
    chats: data?.chats || [],
    isLoading: !isSuccess && !data,
    isError: !isSuccess && !data && chatSessionId !== undefined,
  };
};
