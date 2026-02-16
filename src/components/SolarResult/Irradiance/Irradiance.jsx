export default function Irradiance({ solarData }) {
  if (!solarData) return null;

  return (
    <div className="irradiance">
      <h4>Your Irradiance</h4>
      <p>
        The average solar energy that hits 1m² of your roof. This tells you how
        much sunlight is available in your area for generating solar power.
      </p>

      <p>
        Daily: {solarData.dailyIrradiance} kWh/m² <br /> Yearly:{" "}
        {solarData.yearlyIrradiance} kWh/m²
      </p>
    </div>
  );
}
