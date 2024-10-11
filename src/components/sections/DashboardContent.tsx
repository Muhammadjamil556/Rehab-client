import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../global/Header";
import InputSection from "../global/InputSection";
import { useSelector } from "react-redux";
import {
  selectChatDetails,
  selectDisplayChat,
} from "../../toolkit/slices/dashboard/chat";
import { useSendMessage } from "../../hooks/useSendChat";
import { useFetchChats } from "../../hooks/useFetchChats";
import { useChatSession } from "../../hooks/useChatSession";
import DefaultScreen from "./DefaultScreen";
import { ChatDetailTypes, DashboardTypes } from "../../utils/types";
import useAuth from "../../hooks/user-details";
import { Skeleton } from "../ui/skeleton";
import ReactMarkdown from "react-markdown";

const DashboardContent: React.FC<DashboardTypes> = ({
  isCollapsed,
  onToggle,
}) => {
  // hooks
  const { user } = useAuth();

  const { chatSessionId } = useParams<{ chatSessionId: string }>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Redux state
  const chatsDetails = useSelector(
    selectChatDetails
  ) as unknown as ChatDetailTypes[];
  const displayChat = useSelector(selectDisplayChat);

  const { chatSession, chatSessionLoading, startMessageLoader } =
    useChatSession();
  const { sendMessageHandler, isSendMessageLoading } = useSendMessage();
  useFetchChats();

  // Local state
  const [inputValue, setInputValue] = useState("");

  // Callbacks
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(async () => {
    if (!chatSessionId) {
      return await chatSession({
        inputValue,
        setInputValue,
      });
    }
    return await sendMessageHandler({
      inputValue,
      setInputValue,
      chatSessionId,
    });
  }, [chatSessionId, inputValue, sendMessageHandler, chatSession]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isSendMessageLoading) {
        handleSendMessage();
      }
    },
    [handleSendMessage, isSendMessageLoading]
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      // Add extra padding to ensure loader is visible, especially when loading a message
      const loaderHeight = isSendMessageLoading || chatSessionLoading ? 100 : 0; // Adjust height for loader
      const scrollPadding = 50; // Extra space for smooth visibility

      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight + loaderHeight + scrollPadding;
    }
  }, [chatsDetails, isSendMessageLoading, chatSessionLoading]);
  console.log(chatsDetails, "chatsDetails");

  return (
    <div className="bg-[#09090B] p-6 text-white h-screen flex flex-col justify-end">
      <Header isCollapsed={isCollapsed} onToggle={onToggle} />
      <div className="flex-grow overflow-y-auto" ref={chatContainerRef}>
        <div className="flex flex-col space-y-4">
          {displayChat &&
            chatsDetails.map((chat) => (
              <div key={chat._id} className="flex flex-col space-y-1 p-2">
                {/* Question */}
                <div className="flex justify-start items-start">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="border-2 w-10 h-10 border-[#292930] rounded-full p-1"
                  />
                  <div className="bg-[#292930]  ml-2 p-4 rounded-lg max-w-xl text-white break-words overflow-wrap">
                    <ReactMarkdown>{chat.question}</ReactMarkdown>
                  </div>
                </div>
                {/* Answer */}
                <div className="h-2" />
                <div className="flex justify-start items-start">
                  <img
                    src="https://github.com/shadcn.png"
                    alt=""
                    className="border-2 w-10 border-[#292930] rounded-full p-1"
                  />
                  <div className="ml-2 bg-[#292930] p-4 rounded-lg max-w-xl text-white break-words">
                    <ReactMarkdown>{chat.answer}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          {(isSendMessageLoading ||
            chatSessionLoading ||
            startMessageLoader) && (
            <div className="flex items-center py-6 space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )}

          {!displayChat && <DefaultScreen />}
        </div>
      </div>

      <InputSection
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSend={handleSendMessage}
        onKeyDown={handleKeyDown}
        isLoading={
          isSendMessageLoading || chatSessionLoading || startMessageLoader
        }
      />
    </div>
  );
};

export default DashboardContent;
