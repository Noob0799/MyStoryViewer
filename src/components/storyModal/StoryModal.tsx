import { FC, ReactNode, useContext } from "react";
import ReactDOM from "react-dom";
import { StoryViewerContextType } from "../../@types/StoryViewer";
import { AppContext } from "../../context/ContextProvider";

// Modal component created using React Portal to show each story
const StoryModal: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const data = useContext<StoryViewerContextType | null>(AppContext);
  if (!data?.isOpen) return null;
  return ReactDOM.createPortal(
    <div className="story-modal-container">{children}</div>,
    document.body
  );
};

export default StoryModal;
