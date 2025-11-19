import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [postcode, setPostcode] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [roofType, setRoofType] = useState("Pitched");
  const [roofOrientation, setRoofOrientation] = useState("North");
  const [shading, setShading] = useState("No Shading");
  const [floors, setFloors] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postcode || !roofSize) {
      alert("Please fill in both fields");
      return;
    }
    onSearch({
      postcode,
      roofSize: Number(roofSize),
      roofType,
      roofOrientation,
      shading,
      floors: Number(floors),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Postcode */}
      <div>
        <label>Postcode:</label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
        />
      </div>

      {/* Roof Size */}
      <div>
        <label>Approx Roof Size (m²):</label>
        <input
          type="number"
          value={roofSize}
          onChange={(e) => setRoofSize(e.target.value)}
          placeholder="Enter roof size"
        />
      </div>

      {/* Roof Type */}
      <div>
        <label>Roof Type:</label>
        <div>
          {["Pitched", "Flat"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                checked={roofType === type}
                onChange={(e) => setRoofType(e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Roof Orientation */}
      <div>
        <label>Roof Orientation:</label>
        <div>
          {["North", "South", "East", "West"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                checked={roofOrientation === type}
                onChange={(e) => setRoofOrientation(e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Shading */}
      <div>
        <label>Shading:</label>
        <div>
          {["No Shading", "Partial Shading", "Heavy Shading"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                checked={shading === type}
                onChange={(e) => setShading(e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Floor Number */}
      <div>
        <label>Number of Floors:</label>
        <div>
          {[1, 2, 3].map((num) => (
            <label key={num}>
              <input
                type="radio"
                value={num}
                checked={floors === String(num)}
                onChange={(e) => setFloors(e.target.value)}
              />
              {num}
            </label>
          ))}
        </div>
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}
