import { FC, useContext, useRef } from "react";
import { Story, StoryViewerContextType } from "../../@types/StoryViewer";
import { AppContext } from "../../context/ContextProvider";

const StoryItem: FC<{
  storyToShow: Story | null | undefined;
  userName: string | undefined;
  userImage: string | undefined;
  close: () => void;
}> = ({ storyToShow, userName, userImage, close }) => {
  const data = useContext<StoryViewerContextType | null>(AppContext);
  const storyImageRef = useRef<HTMLInputElement | null>(null);
  const handleClick = (e: { nativeEvent: { offsetX: any } }) => {
    if (!storyImageRef.current) return;
    const divWidth = storyImageRef.current.getBoundingClientRect().width;
    const halfDivWidth = divWidth / 2;
    const mouseXPos = e.nativeEvent.offsetX;

    if (mouseXPos <= halfDivWidth) {
      data?.showPreviousStory();
    } else {
      data?.showNextStory();
    }
  };
  return (
    <>
      <div
        className="story-modal-img-container"
        ref={storyImageRef}
        onClick={handleClick}
      >
        <div className="story-modal-header">
          <div className="story-modal-user-details">
            <div className="story-modal-user-image-container">
              <img
                src={userImage}
                alt={`Story of user ${userName}`}
                className="story-modal-user-image"
              />
            </div>
            <div>{userName}</div>
          </div>
          <div className="close-icon" onClick={close}>
            X
          </div>
        </div>
        <img
          src={storyToShow?.img}
          alt={`Story of user ${userName}`}
          className="story-modal-img"
        />
      </div>
    </>
  );
};

export default StoryItem;
