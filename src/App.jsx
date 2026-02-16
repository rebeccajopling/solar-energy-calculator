import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import SolarResult from "./components/SolarResult/SolarResult";
import { Routes, Route } from "react-router";
import backgroundImage from "./assets/detail-shot-patterned-wall_09.png";

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
