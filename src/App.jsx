import "./App.css";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import SolarResult from "./components/SolarResult/SolarResult";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/results" element={<SolarResult />} />
      </Routes>
    </div>
  );
}

export default App;
