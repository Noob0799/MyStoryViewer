import StoriesSection from "./components/StoriesSection";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <>
      <header>
        <h2>Instagram</h2>
      </header>
      <ContextProvider>
        <StoriesSection />
      </ContextProvider>
    </>
  );
}

export default App;
