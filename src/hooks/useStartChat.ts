import { useNavigate } from "react-router-dom";
import { useStartChatMutation } from "../toolkit/services/chat-api";
import { useToast } from "./use-toast";
import useAuth from "./user-details";
import { setDisplayChat } from "../toolkit/slices/dashboard/chat";
import { useDispatch } from "react-redux";

export const useStartChatSession = () => {
  const [startChat, { isLoading: isStartChatLoading }] = useStartChatMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useAuth();
  const userId = user?._id;

  const startChatSession = async () => {
    if (!userId) {
      toast({ description: "User not found." });
      return;
    }

    try {
      const response: any = await startChat({ userId }).unwrap();
      console.log(response, "response");
      const sessions = response?.session?.sessions;
      const lastSession = sessions[sessions?.length - 1];
      const newChatSessionId = lastSession?.chatSessionId;
      navigate(`/c/${newChatSessionId}`);
      dispatch(setDisplayChat(true));

      toast({ description: "Chat started successfully!" });
    } catch (error) {
      toast({ description: "Failed to start chat." });
    }
  };

  return {
    startChatSession,
    isStartChatLoading,
  };
};
