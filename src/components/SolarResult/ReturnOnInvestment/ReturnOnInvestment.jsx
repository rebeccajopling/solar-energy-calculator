import { useState } from "react";
import "../SolarResult.css";

export default function ReturnOnInvestment() {
  const [electricityRate, setElectricityRate] = useState(0.24);
  return (
    <div className="card card-light">
      <div>
        <h2>
          Calculate Your
          <br className="line-break" /> Return On Investment
        </h2>
      </div>
      <label>What is your current electricity rate ($/kWh)?</label>
      <p>
        This can be found on your electricity bill. If you do not know your
        rate, use the current UK average of 0.24 (24p/kWh).
      </p>
      <input
        type="number"
        step="0.01"
        name="electricityRate"
        value={electricityRate}
        onChange={(e) => setElectricityRate(Number(e.target.value))}
        placeholder="0.24"
      />
      <div className="solar-panel-optipns">
        <h4>Choose Your Solar Panel Option</h4>
      </div>
    </div>
  );
}
