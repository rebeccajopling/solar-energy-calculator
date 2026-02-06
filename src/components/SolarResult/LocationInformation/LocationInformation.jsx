export default function LocationInformation({ solarData }) {
  if (!solarData) return null;

  return (
    <div className="location-information">
      <h4>Local Sunlight Data</h4>
      <p>Your Irradiance</p>
      <p>
        The average solar energy that hits 1m² of your roof. This tells you how
        much sunlight is available in your area for generating solar power.
      </p>

      <p>
        Daily: {solarData.dailyIrradiance} kWh/m² <br /> Yearly:{" "}
        {solarData.yearlyIrradiance} kWh/m²
      </p>

      <p>Your Energy Output</p>
      <p>
        The amount of electricity a typical small solar panel system (1kWp)
        could generate using the sunlight your roof receives.
      </p>
      <p>
        Daily: {solarData.dailyEnergyOutput.toFixed(0)} kWh/day <br /> Yearly:{" "}
        {solarData.yearlyEnergyOutput.toFixed(0)} kWh/year
      </p>

      <p>
        Data provided by PVGIS, based on solar radiation measurements for your
        postcode
      </p>
    </div>
  );
}
