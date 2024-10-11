import { useSendMessageMutation } from "../toolkit/services/chat-api";
import { useToast } from "./use-toast";
import useAuth from "./user-details";
import { setChats, setDisplayChat } from "../toolkit/slices/dashboard/chat";
import { useDispatch } from "react-redux";

interface SendMessagePayload {
  inputValue: string;
  setInputValue: any | unknown;
  chatSessionId: string;
}

export const useSendMessage = () => {
  const [sendMessage, { isLoading: isSendMessageLoading }] =
    useSendMessageMutation();
  const { toast } = useToast();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const sendMessageHandler = async ({
    inputValue,
    setInputValue,
    chatSessionId,
  }: SendMessagePayload) => {
    const payload = {
      chatSessionId: chatSessionId,
      userQuestion: inputValue,
      aiAnswer: "123",
      userId: user?._id,
    };

    // Validate if chatSessionId is available
    if (!payload.chatSessionId) {
      toast({ description: "Chat session ID not provided." });
      return;
    }

    try {
      const res = await sendMessage(payload).unwrap();
      const lastSession =
        res?.session?.sessions[res.session.sessions.length - 1]; // Get the last session in the array
      const chats = lastSession.chats; // Access the chats array from the last session

      dispatch(setChats(chats));
      dispatch(setDisplayChat(true));

      setInputValue("");
      // toast({ description: "Message sent successfully!" }); // Success notification
    } catch (error) {
      // Handle any errors and show a failure toast
      toast({ description: "Failed to send message." });
    }
  };

  return {
    sendMessageHandler,
    isSendMessageLoading,
  };
};
