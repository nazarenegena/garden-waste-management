import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PermitCheck from "./components/PermitCheck";
import ThemeToggle from "./components/ThemeToggle";
import SelectSkip from "./components/SelectSkip";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-background dark:text-neutral transition-colors duration-300">
        <ThemeToggle />
        <main className="flex-grow justify-center items-center pb-40">
          <Routes>
            <Route path="/" element={<SelectSkip />} />
            <Route path="/permit-check" element={<PermitCheck />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
