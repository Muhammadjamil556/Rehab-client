import { Settings } from "lucide-react";
import { FC, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSessionDetails,
  setSessionDetails,
} from "../../toolkit/slices/dashboard/session";
import { FiSidebar } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useGetSessionDetailsQuery } from "../../toolkit/services/chat-api";
import useAuth from "../../hooks/user-details";
import { ImSpinner3 } from "react-icons/im";
import { format } from "date-fns";
import { setDisplayChat } from "../../toolkit/slices/dashboard/chat";
import {
  SidebarProps,
  SessionDetail,
  GetSessionDetailResponse,
} from "../../utils/types";

const Sidebar: FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id;

  const { data, isLoading } = useGetSessionDetailsQuery(userId || "", {
    skip: !userId,
  }) as { data?: GetSessionDetailResponse; isLoading: boolean };

  // Dispatch session details when data is available
  useEffect(() => {
    if (data && data.sessionDetails) {
      dispatch(setSessionDetails(data.sessionDetails));
    }
  }, [data, dispatch]);

  const recentChats = useSelector(selectSessionDetails) as SessionDetail[];
  const handleNavigation = (sessionId: string) => {
    navigate(`/c/${sessionId}`);
    dispatch(setDisplayChat(true));
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`text-white flex flex-col justify-between fixed top-0 left-0 h-screen transition-width duration-300 ${
        isCollapsed ? "w-0" : "w-64"
      }`}
    >
      <div className="p-4 flex flex-col justify-between h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <FiSidebar className="cursor-pointer" onClick={onToggle} />
          {!isCollapsed && <p className="text-2xl font-bold">HazenAI</p>}
        </div>

        {!isCollapsed && (
          <div className="space-y-4 overflow-y-scroll">
            <p className="text-sm font-bold">Recent</p>
            <ul className="space-y-2">
              {isLoading && <ImSpinner3 className="animate-spin" />}
              {recentChats && recentChats.length === 0 && !isLoading && (
                <p className="font-SassoonPrimary text-[13px]">
                  No chats available 💬
                </p>
              )}
              {recentChats &&
                recentChats.map(
                  (
                    {
                      title,
                      chatSessionId,
                    }: { title: string; chatSessionId: string },
                    index: number
                  ) => {
                    const formattedTitle = format(
                      new Date(title),
                      "MMMM d, yyyy h:mm a"
                    );
                    return (
                      <li
                        onClick={() => {
                          handleNavigation(chatSessionId);
                        }}
                        key={index}
                        className="flex cursor-pointer text-sm items-center"
                      >
                        <IoChatbubbleOutline className="mr-2 w-4 h-4" />
                        {formattedTitle}
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        )}

        <div className="relative mt-auto pt-4">
          <Popover>
            <PopoverTrigger>
              <p className="flex gap-2 items-center cursor-pointer font-bold">
                <Settings className="text-white" />
                Settings
              </p>
            </PopoverTrigger>
            <PopoverContent className="bg-foreground text-background p-4 rounded-md w-40 shadow-lg">
              <ul className="space-y-2">
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                >
                  <IoMdLogOut className="h-4 w-4" />
                  Logout
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
