import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";
import "./SolarResult.css";
import Map from "./Map/Map";
import ResultBenchmarks from "./ResultBenchmarks/ResultBenchmarks";
import LocationInformation from "./LocationInformation/LocationInformation";

export default function SolarResult() {
  const [params] = useSearchParams();
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [solarData, setSolarData] = useState(null);

  const data = {
    postcode: params.get("postcode"),
    roofSize: Number(params.get("roofSize")),
    electricityRate: Number(params.get("electricityRate")),
    roofType: params.get("roofType"),
    roofOrientation: params.get("roofOrientation"),
    shading: params.get("shading"),
    floors: Number(params.get("floors")),
  };

  useEffect(() => {
    const {
      postcode,
      electricityRate,
      roofSize,
      roofType,
      roofOrientation,
      shading,
    } = data;

    if (
      !postcode ||
      !electricityRate ||
      !roofSize ||
      !roofType ||
      !roofOrientation ||
      !shading
    ) {
      setError("Input data missing");
      return;
    }

    const fetchData = async () => {
      try {
        // Google data
        const geoRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`
        );

        const geoData = await geoRes.json();

        if (!geoData.results?.length) {
          setError("No coordinates found for this postcode");
          return;
        }

        const { lat, lng } = geoData.results[0].geometry.location;
        setCoords({ lat, lng });

        // PVGIS data
        const pvgisRes = await fetch(
          `http://localhost:3001/api/solar?lat=${lat}&lon=${lng}`
        );
        const pvgisData = await pvgisRes.json();

        const dailyIrradiance = pvgisData.outputs.totals.fixed["H(i)_d"];
        const yearlyIrradiance = pvgisData.outputs.totals.fixed["H(i)_y"];
        const dailyEnergyOutput = pvgisData.outputs.totals.fixed["E_d"];
        const yearlyEnergyOutput = pvgisData.outputs.totals.fixed["E_y"];

        // Calculations
        const maxPowerOutputKw = roofSize * 0.2;
        const basePotential = maxPowerOutputKw * yearlyEnergyOutput;

        const roofTypeFactor = roofType === "Flat" ? 0.9 : 1;

        const orientationFactor = {
          South: 1,
          East: 0.9,
          West: 0.9,
          North: 0.8,
        }[roofOrientation];

        const shadingFactor = {
          "No Shading": 1,
          "Partial Shading": 0.85,
          "Heavy Shading": 0.7,
        }[shading];

        const adjustedPotential =
          basePotential * roofTypeFactor * orientationFactor * shadingFactor;

        setSolarData({
          dailyIrradiance,
          yearlyIrradiance,
          dailyEnergyOutput,
          yearlyEnergyOutput,
          adjustedPotential,
        });
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching solar data");
      }
    };

    fetchData();
  }, [params]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!coords || !solarData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard first-row">
        <div className="card card-dark">
          <p>Your Result:</p>
          <h3>
            {solarData.adjustedPotential >= 4000
              ? "Excellent"
              : solarData.adjustedPotential >= 3000
              ? "Good"
              : solarData.adjustedPotential >= 2000
              ? "Average"
              : "Poor"}{" "}
            <br />
            {solarData.adjustedPotential.toFixed(0)} kWh/year
          </h3>
          <p>
            Calculated using local sunlight data and your roof’s specific
            conditions, we estimate your system can produce approximately{" "}
            {solarData.adjustedPotential.toFixed(0)} kWh of solar energy
            annually.
          </p>
        </div>
        <div className="card card-light">
          <ResultBenchmarks />
        </div>
      </div>
      <div className="dashboard second-row">
        <div className="card card-light">
          <LocationInformation solarData={solarData} />
        </div>
        <div className="card card-map">
          <Map lat={coords.lat} lng={coords.lng} />
        </div>
      </div>
      <Link to="/">Edit inputs</Link>
    </div>
  );
}
