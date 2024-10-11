export interface DashboardTypes {
  isCollapsed: boolean;
  onToggle: () => void;
}
export interface ChatDetailTypes {
  question: string;
  answer: string;
  _id: string;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface SessionDetail {
  chatSessionId: string;
  title: string;
  chatStarted: boolean;
}

export interface GetSessionDetailResponse {
  message: string;
  sessionDetails: SessionDetail[];
}
export interface InputSectionProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}
