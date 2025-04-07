import NavBar from "./components/NavBar";
import Skips from "./components/Skips";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-background dark:text-neutral transition-colors duration-300">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Skips />
      </main>
    </div>
  );
}

export default App;
