import { Routes, Route } from "react-router";
import SearchForm from "./components/SearchForm/SearchForm";
import SolarResult from "./components/SolarResult/SolarResult";
import backgroundImage from "./assets/detail-shot-patterned-wall_1920x1080.png";
import "./App.css";

function App() {
  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/results" element={<SolarResult />} />
      </Routes>
    </div>
  );
}

export default App;
