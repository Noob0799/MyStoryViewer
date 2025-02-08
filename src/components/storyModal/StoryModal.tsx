import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

const StoryModal: FC<{ isOpen: boolean | undefined; children: ReactNode }> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(<div className="story-modal-container">{children}</div>, document.body);
};

export default StoryModal;
