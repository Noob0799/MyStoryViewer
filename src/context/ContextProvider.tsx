import { createContext, FC, ReactNode, useEffect, useRef, useState } from "react";
import * as response from "../data/storiesData.json";
import { Story, StoryObj, StoryViewerContextType } from "../@types/StoryViewer";

export const AppContext = createContext<StoryViewerContextType | null>(null);

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [storiesData, setStoriesData] = useState<StoryObj[] | null>(
    response.storiesData
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<StoryObj | null>(null);
  const [storyToShow, setStoryToShow] = useState<Story | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  // Function to mark a user as viewed when all of the user's stories are viewed
  const updateViewedStory = (
    storyId: number | undefined,
    userId: number | undefined
  ) => {
    let updatedStoriesData: StoryObj[] | null = storiesData
      ? storiesData.map((storiesObj) => {
          if (storiesObj.id === userId) {
            let allViewed: boolean = true;
            const updatedStories = storiesObj.stories.map((story) => {
              if (story.id === storyId) {
                story.viewed = true;
              }
              allViewed = allViewed && story.viewed;
              return story;
            });
            storiesObj.stories = updatedStories;
            storiesObj.viewed = allViewed;
          }
          return storiesObj;
        })
      : [];
    setStoriesData(updatedStoriesData);
  };
  /* Function to find the user details and all the stories 
  and then find the first story that has not been viewed 
  or first story in the list if all the stories are viewed */
  const findStoryToShow = (userId: number) => {
    if (!storiesData) return;
    let storiesObj = null,
      storyObj = null;
    for (let i = 0; i < storiesData.length; i++) {
      if (storiesData[i].id === userId) {
        storiesObj = storiesData[i];
        break;
      }
    }
    if (!storiesObj) return;
    setSelectedUser(storiesObj);
    for (let i = 0; i < storiesObj?.stories.length; i++) {
      if (!storiesObj.stories[i].viewed) {
        storyObj = storiesObj.stories[i];
        break;
      } else if (i === storiesObj?.stories.length - 1 && !storyObj) {
        storyObj = storiesObj.stories[0];
      }
    }
    setStoryToShow(storyObj);
  };
  // Function to find previous story
  const getPreviousStory = () => {
    if (!selectedUser) return null;
    let previousStory = null,
      previousUserObj = selectedUser;
    for (let i = 0; i < selectedUser?.stories.length; i++) {
      if (selectedUser?.stories[i].id === storyToShow?.id) {
        if (i - 1 >= 0) {
          previousStory = selectedUser?.stories[i - 1];
        }
        break;
      }
    }
    if (!previousStory && storiesData) {
      for (let i = 0; i < storiesData.length; i++) {
        if (storiesData[i].id === selectedUser.id) {
          if (i - 1 >= 0) {
            previousStory =
              storiesData[i - 1].stories[storiesData[i - 1].stories.length - 1];
            previousUserObj = storiesData[i - 1];
          }
          break;
        }
      }
    }
    return { previousStory, previousUserObj };
  };
  // Function to store previous story in state or close modal if no story available
  const showPreviousStory = () => {
    const previousStoryDetails = getPreviousStory();
    if (
      previousStoryDetails?.previousStory &&
      previousStoryDetails?.previousUserObj
    ) {
      setStoryToShow(previousStoryDetails?.previousStory);
      setSelectedUser(previousStoryDetails?.previousUserObj);
    } else {
      setIsOpen(false);
    }
  };
  // Function to find next story
  const getNextStory = () => {
    if (!selectedUser) return null;
    let nextStory = null,
      nextUserObj = selectedUser;
    for (let i = 0; i < selectedUser?.stories.length; i++) {
      if (selectedUser?.stories[i].id === storyToShow?.id) {
        if (i + 1 < selectedUser?.stories.length) {
          nextStory = selectedUser?.stories[i + 1];
        }
        break;
      }
    }
    if (!nextStory && storiesData) {
      for (let i = 0; i < storiesData.length; i++) {
        if (storiesData[i].id === selectedUser.id) {
          if (i + 1 < storiesData.length) {
            nextStory = storiesData[i + 1].stories[0];
            nextUserObj = storiesData[i + 1];
          }
          break;
        }
      }
    }
    return { nextStory, nextUserObj };
  };
  // Function to store next story in state or close modal if no story available
  const showNextStory = () => {
    const nextStoryDetails = getNextStory();
    if (nextStoryDetails?.nextStory && nextStoryDetails?.nextUserObj) {
      setStoryToShow(nextStoryDetails?.nextStory);
      setSelectedUser(nextStoryDetails?.nextUserObj);
    } else {
      setIsOpen(false);
    }
  };
  /* Function to be called once the story to be shown is stored in state
  A timer is set to switch to next story after 5 seconds or close the modal after 5 seconds*/
  useEffect(() => {
    if (storyToShow) {
      updateViewedStory(storyToShow.id, selectedUser?.id);
      const nextStoryDetails = getNextStory();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
      if (nextStoryDetails?.nextStory && nextStoryDetails?.nextUserObj) {
        timerRef.current = setTimeout(() => {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
          setStoryToShow(nextStoryDetails?.nextStory);
          setSelectedUser(nextStoryDetails?.nextUserObj);
        }, 5000);
      } else {
        timerRef.current = setTimeout(() => {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
          setIsOpen(false);
        }, 5000);
      }
      return () => {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      };
    }
  }, [storyToShow]);
  // Function to set selected user and selected story as null when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
      setStoryToShow(null);
      timerRef.current = undefined;
    }
  }, [isOpen]);
  const data: StoryViewerContextType = {
    storiesData,
    updateViewedStory,
    isOpen,
    setIsOpen,
    storyToShow,
    findStoryToShow,
    selectedUser,
    showPreviousStory,
    showNextStory,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default ContextProvider;
