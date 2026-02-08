import { useState } from "react";
import "./SearchForm.css";
import FlatIcon from "../../assets/solar-energy-icons-flat-roof.svg";
import PitchedIcon from "../../assets/solar-energy-icons-pitched-roof.svg";
import Floor1Icon from "../../assets/solar-energy-icons-1-floor.svg";
import Floor2Icon from "../../assets/solar-energy-icons-2-floor.svg";
import Floor3Icon from "../../assets/solar-energy-icons-3-floor.svg";
import NorthIcon from "../../assets/solar-energy-icons-north.svg";
import SouthIcon from "../../assets/solar-energy-icons-south.svg";
import EastIcon from "../../assets/solar-energy-icons-east.svg";
import WestIcon from "../../assets/solar-energy-icons-west.svg";
import MinShadingIcon from "../../assets/solar-energy-icons-minimal-shading.svg";
import MaxShadingIcon from "../../assets/solar-energy-icons-maximum-shading.svg";

const roofTypeIcons = {
  Flat: FlatIcon,
  Pitched: PitchedIcon,
};

const floorIcons = {
  "One Floor": Floor1Icon,
  "Two Floors": Floor2Icon,
  "Three or More": Floor3Icon,
};

const orientationIcons = {
  North: NorthIcon,
  South: SouthIcon,
  East: EastIcon,
  West: WestIcon,
};

const shadingIcons = {
  "Minimal Shading": MinShadingIcon,
  "Maximum Shading": MaxShadingIcon,
};

export default function SearchForm() {
  const [postcode, setPostcode] = useState("");
  const [electricityRate, setElectricityRate] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [roofType, setRoofType] = useState(null);
  const [roofOrientation, setRoofOrientation] = useState(null);
  const [shading, setShading] = useState("No Shading");
  const [floors, setFloors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !postcode ||
      !electricityRate ||
      !roofSize ||
      !roofType ||
      !roofOrientation ||
      !shading ||
      !floors
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Build data object
    const data = {
      postcode,
      electricityRate: Number(electricityRate),
      roofSize: Number(roofSize),
      roofType,
      roofOrientation,
      shading,
      floors: Number(floors),
    };

    // Navigate to results page with query params
    const query = new URLSearchParams(data).toString();
    window.location.href = `/results?${query}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>
          Estimate your <br className="line-break" />{" "}
          <span className="highlight">Solar Energy Potential</span>:
        </h3>
        <p>Please fill in all fields</p>
      </div>

      {/* Postcode */}
      <div>
        <label>What is your postcode?</label>
        <input
          type="text"
          name="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="SW1A 1AA"
        />
      </div>

      {/* Roof Size */}
      <div>
        <label>What is the size of your roof (m²)?</label>
        <input
          type="number"
          name="roofSize"
          value={roofSize}
          onChange={(e) => setRoofSize(e.target.value)}
          placeholder="60"
        />
        <p>
          This will be used to estimate how many solar panels can fit on your
          roof. If you do not know the exact size, you can use an estimate - the
          average UK roof size varies by house type, generally ranging from
          around 60m² for a 2-bed terraced home to 120m² or more for a 4-bed
          detached property.
        </p>
      </div>

      {/* Electricity Rate */}
      <div>
        <label>What is your current electricity rate ($/kWh)?</label>
        <input
          type="number"
          step="0.01"
          name="electricityRate"
          value={electricityRate}
          onChange={(e) => setElectricityRate(Number(e.target.value))}
          placeholder="0.24"
        />
        <p>
          This can be found on your electricity bill and will be used to
          calculate your return on investment. If you do not know your rate, use
          the current UK average of 0.24 (24p/kWh).
        </p>
      </div>

      {/* Roof Type */}
      <div>
        <label>What type of roof do you have?</label>
        <div className="options-grid">
          {["Flat", "Pitched"].map((type) => {
            const iconSrc = roofTypeIcons[type];
            const isSelected = roofType === type;

            return (
              <label
                key={type}
                className={`option ${isSelected ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="rooftype"
                  value={type}
                  checked={isSelected}
                  onChange={(e) => setRoofType(e.target.value)}
                />
                <img src={iconSrc} alt={type} />
                <span className="options-text">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Roof Orientation */}
      <div>
        <label>What is your roof orientation?</label>
        <div className="options-grid">
          {["North", "South", "East", "West"].map((orientation) => {
            const iconSrc = orientationIcons[orientation];
            const isSelected = roofOrientation === orientation;

            return (
              <label
                key={orientation}
                className={`option ${isSelected ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="orientation"
                  value={orientation}
                  checked={isSelected}
                  onChange={(e) => setRoofOrientation(e.target.value)}
                />
                <img src={iconSrc} alt={orientation} />
                <span className="options-text">{orientation}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Floor Number */}
      <div>
        <label>How many floors do you have?</label>
        <div className="options-grid">
          {["One Floor", "Two Floors", "Three or More"].map((num) => {
            const iconSrc = floorIcons[num];
            const isSelected = floors === num;

            return (
              <label
                key={num}
                className={`option ${isSelected ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="floors"
                  value={num}
                  checked={isSelected}
                  onChange={(e) => setFloors(e.target.value)}
                />
                <img src={iconSrc} alt={num} />
                <span className="options-text">{num}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Shading */}
      <div>
        <label>How would you describe the shading?</label>
        <div className="options-grid">
          {["Minimal Shading", "Maximum Shading"].map((type) => {
            const iconSrc = shadingIcons[type];
            const isSelected = shading === type;

            return (
              <label
                key={type}
                className={`option ${isSelected ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="shading"
                  value={type}
                  checked={isSelected}
                  onChange={(e) => setShading(e.target.value)}
                />
                <img src={iconSrc} alt={type} />
                <span className="options-text">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button type="submit" className="submit">
        Calculate
      </button>
    </form>
  );
}
