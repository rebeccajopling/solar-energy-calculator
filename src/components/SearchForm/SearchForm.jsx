import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm() {
  const [postcode, setPostcode] = useState("");
  const [electricityRate, setElectricityRate] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [roofType, setRoofType] = useState("Pitched");
  const [roofOrientation, setRoofOrientation] = useState("North");
  const [shading, setShading] = useState("No Shading");
  const [floors, setFloors] = useState(1);

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
          Estimate your <br />{" "}
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
        <div>
          {["Pitched", "Flat"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="roofType"
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
        <label>What is your roof orientation?</label>
        <div>
          {["North", "South", "East", "West"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="roofOrientation"
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
        <label>How would you describe the shading?</label>
        <div>
          {["No Shading", "Partial Shading", "Heavy Shading"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="shading"
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
        <label>How many number of floors do you have?</label>
        <div>
          {[1, 2, 3].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="floors"
                value={num}
                checked={floors === num}
                onChange={(e) => setFloors(Number(e.target.value))}
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
