import { useContext, useRef } from "react";
import { StoryViewerContextType } from "../../@types/StoryViewer";
import { AppContext } from "../../context/ContextProvider";

const StoryItem = () => {
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
                src={data?.selectedUser?.userImg}
                alt={`Story of user ${data?.selectedUser?.userName}`}
                className="story-modal-user-image"
              />
            </div>
            <div>{data?.selectedUser?.userName}</div>
          </div>
          <div className="close-icon" onClick={close}>
            X
          </div>
        </div>
        <img
          src={data?.storyToShow?.img}
          alt={`Story of user ${data?.selectedUser?.userName}`}
          className="story-modal-img"
        />
      </div>
    </>
  );
};

export default StoryItem;
