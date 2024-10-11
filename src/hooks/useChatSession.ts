import { useNavigate } from "react-router-dom";
import { useStartChatMutation } from "../toolkit/services/chat-api";
import { useToast } from "./use-toast";
import useAuth from "./user-details";
import { useSendMessage } from "./useSendChat";
import { setDisplayChat } from "../toolkit/slices/dashboard/chat";
import { useDispatch } from "react-redux";

export const useChatSession = () => {
  const [startChat, { isLoading: chatSessionLoading }] = useStartChatMutation();
  const { sendMessageHandler, isSendMessageLoading: startMessageLoader } =
    useSendMessage();

  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?._id;

  const chatSession = async ({ inputValue, setInputValue }: any) => {
    if (!userId) {
      toast({ description: "User not found." });
      return;
    }

    try {
      dispatch(setDisplayChat(true));

      const response: any = await startChat({ userId }).unwrap();
      const sessions = response?.session?.sessions;
      const lastSession = sessions[sessions?.length - 1];
      const newChatSessionId = lastSession?.chatSessionId;
      navigate(`/c/${newChatSessionId}`);
      await sendMessageHandler({
        inputValue,
        setInputValue,
        chatSessionId: newChatSessionId,
      });

      toast({ description: "Chat started successfully!" });
    } catch (error) {
      toast({ description: "Failed to start chat." });
    }
  };

  return {
    chatSession,
    chatSessionLoading,
    startMessageLoader,
  };
};
