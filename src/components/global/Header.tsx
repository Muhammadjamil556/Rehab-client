import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/button";
import useAuth from "../../hooks/user-details";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDisplayChat } from "../../toolkit/slices/dashboard/chat";

interface HeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Header = ({ isCollapsed, onToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dispatch = useDispatch();
  const handleNewChat = () => {
    navigate("/");
    dispatch(setDisplayChat(false));
  };
  return (
    <div
      className={`flex ${
        isCollapsed ? "justify-between" : "justify-end"
      } mb-4 `}
    >
      {isCollapsed && <Menu className="cursor-pointer" onClick={onToggle} />}
      <div className="flex gap-1">
        <Button
          onClick={handleNewChat}
          className="mr-5 bg-white text-black hover:text-black hover:bg-yellow-50"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
        <Avatar>
          <AvatarImage
            src={user ? user?.avatar : "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
