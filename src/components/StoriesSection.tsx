import { StoryViewerContextType } from "../@types/StoryViewer";
import { AppContext } from "../context/ContextProvider";
import { useContext } from "react";
import StoryCard from "./StoryCard";
import StoryModal from "./storyModal/StoryModal";
import StoryItem from "./storyModal/StoryItem";

const StoriesSection = () => {
  const data = useContext<StoryViewerContextType | null>(AppContext);
  return (
    <>
      <div className="stories-container">
        {data?.storiesData?.map((story) => (
          <StoryCard {...story} key={story.id} />
        ))}
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

export default StoriesSection;
