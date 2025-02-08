import { FC, useContext } from "react";
import { StoryObj, StoryViewerContextType } from "../@types/StoryViewer";
import { AppContext } from "../context/ContextProvider";
import StoryModal from "./storyModal/StoryModal";
import StoryItem from "./storyModal/StoryItem";

const StoryCard: FC<StoryObj> = (props) => {
  const data = useContext<StoryViewerContextType | null>(AppContext);
  const handleStoryOpening = (userId: number) => {
    data?.findStoryToShow(userId);
    data?.setIsOpen(true);
  };
  return (
    <>
      <div className="story-card">
        <div className="img-container">
          <img
            src={props.userImg}
            alt={`Story of user ${props.userName}`}
            className={`story-card-img ${props.viewed ? "story-viewed" : ""}`}
            onClick={() => handleStoryOpening(props.id)}
          />
        </div>
        <div className="story-card-user-name">
          {props.self ? "Your Story" : props.userName}
        </div>
      </div>
      <StoryModal isOpen={data?.isOpen}>
        <StoryItem
          storyToShow={data?.storyToShow}
          userName={data?.selectedUser?.userName}
          userImage={data?.selectedUser?.userImg}
          close={() => data?.setIsOpen(false)}
        />
      </StoryModal>
    </>
  );
};

export default StoryCard;
