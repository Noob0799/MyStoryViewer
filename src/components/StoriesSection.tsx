import { StoryViewerContextType } from "../@types/StoryViewer";
import { AppContext } from "../context/ContextProvider";
import { useContext } from "react";
import StoryCard from "./StoryCard";

const StoriesSection = () => {
  const data = useContext<StoryViewerContextType | null>(AppContext);
  return (
    <div className="stories-container">
      {data?.storiesData?.map((story) => (
        <StoryCard {...story} key={story.id} />
      ))}
    </div>
  );
};

export default StoriesSection;
