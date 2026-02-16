export default function EnergyOutput({ solarData }) {
  if (!solarData) return null;

  return (
    <div className="energy-output">
      <h4>Your Energy Output</h4>
      <p>
        The amount of electricity a typical small solar panel system (1kWp)
        could generate using the sunlight your roof receives.
      </p>
      <p>
        Daily: {solarData.dailyEnergyOutput.toFixed(0)} kWh/day <br /> Yearly:{" "}
        {solarData.yearlyEnergyOutput.toFixed(0)} kWh/year
      </p>
    </div>
  );
}
