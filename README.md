# My Story Viewer
Link to live server: https://noob-story-viewer.netlify.app/

Steps to run code locally:  
- "git clone" the repository
- Open a terminal and navigate to the codebase
- "git checkout dev-story-viewer" to checkout the development branch
- Run "npm install"
- Run "npm run dev". The server will fire up and run on a dedicated port

## Mobile view of landing screen
![image](https://github.com/user-attachments/assets/bc646ca5-deb1-4dad-8994-2bf3e875ed44)

## Mobile view of story
![image](https://github.com/user-attachments/assets/dd14ce58-1e43-46a1-9804-5aa991f5ccad)

### Overview of design:
- storiesData.json -> JSON file for storing the data structure that holds data containing list of stories uploaded by different users
- StoriesSection component -> Parent component for rendering list of stories
- StoryCard component -> Component for each story in minimized form. It renders the user image and the user name. The user image has either a red border indicating the user has uploaded a new story or a green border indicating all stories of the user has been viewed
- StoryModal component -> This is the main modal component created using React Portal to render the modal outside the App component
- StoryItem component -> This is the child component of the StoryModal component which changes based on the content of the story and the user who uploaded the story
- Context API is being used to share list of stories uploaded by different users
- Stories will automatically transit to the next one at an interval of 5 seconds
- Story can also be tapped in the left or right section. On tapping on the left side, the previous story will be rendered. On tapping on the right side, the next story will be rendered
- On clicking of the "X" button, the StoryModal will be closed
- The name of the user and the user image will be shown on the top left of the StoryModal component
- The StoryModal will automatically close once the last story is reached while traversing right and the first story is reached while traversing left

## Optimizations for performance and scalability:
- The StoryModal is created using React Portal so that it is rendered outside the App component hierarchy. Also it is a Higher Order Component used to render different Stories as child components
- Context API is being used to overcome prop drilling and state management in multiple components as it can be complex. Also it helps in sharing the state across multiple components and keeping business logic in one place
- Reusable functions are used to handle specific parts of business logic
- The JSON datastructure is scalable ie. new stories or new user objects containing new stories can easily be added and managed
- SetTimeouts are getting cleared to prevent memory leaks from components
