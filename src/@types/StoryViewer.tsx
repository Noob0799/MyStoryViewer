export interface Story {
    id: number;
    img: string;
    viewed: boolean;
}

export interface StoryObj {
    id: number;
    userName: string;
    userImg: string;
    self: boolean;
    viewed: boolean;
    stories: Story[];
}

export type StoryViewerContextType = {
    storiesData: StoryObj[] | null;
    updateViewedStory: (storyId: number, userId: number) => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    storyToShow: Story | null | undefined;
    findStoryToShow: (userId: number) => void;
    selectedUser: StoryObj | null;
    showPreviousStory: () => void;
    showNextStory: () => void;
};