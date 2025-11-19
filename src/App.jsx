import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import SolarResult from "./components/SolarResult/SolarResult";

function App() {
  const [searchData, setSearchData] = useState(null);

  return (
    <>
      <Header />
      <SearchForm onSearch={setSearchData} />
      {searchData && (
        <SolarResult
          postcode={searchData.postcode}
          roofSize={searchData.roofSize}
          roofType={searchData.roofType}
          roofOrientation={searchData.roofOrientation}
          shading={searchData.shading}
        />
      )}
    </>
  );
}

export default App;
