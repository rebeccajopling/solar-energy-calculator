import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";
import "./SolarResult.css";
import Map from "./Map/Map";
import ResultBenchmarks from "./ResultBenchmarks/ResultBenchmarks";
import ReturnOnInvestment from "./ReturnOnInvestment/ReturnOnInvestment";
import Irradiance from "./Irradiance/Irradiance";
import EnergyOutput from "./EnergyOutput/EnergyOutput";

export default function SolarResult() {
  const [params] = useSearchParams();
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [solarData, setSolarData] = useState(null);

  const data = {
    postcode: params.get("postcode"),
    roofSize: Number(params.get("roofSize")),
    roofType: params.get("roofType"),
    roofOrientation: params.get("roofOrientation"),
    shading: params.get("shading"),
    floors: Number(params.get("floors")),
  };

  useEffect(() => {
    const { postcode, roofSize, roofType, roofOrientation, shading } = data;

    if (!postcode || !roofSize || !roofType || !roofOrientation || !shading) {
      setError("Input data missing");
      return;
    }

    const fetchData = async () => {
      try {
        // fetch everything from server
        const res = await fetch(
          `http://localhost:3001/api/solar?postcode=${encodeURIComponent(postcode)}`,
        );

        const json = await res.json();

        if (json.error) {
          setError(json.error);
          return;
        }

        const { latitude: lat, longitude: lng, solar } = json;
        setCoords({ lat, lng });

        // PVGIS data is now inside solar.data
        const dailyIrradiance = solar.outputs.totals.fixed["H(i)_d"];
        const yearlyIrradiance = solar.outputs.totals.fixed["H(i)_y"];
        const dailyEnergyOutput = solar.outputs.totals.fixed["E_d"];
        const yearlyEnergyOutput = solar.outputs.totals.fixed["E_y"];

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

        const shadingFactor = shading === "Minimal Shading" ? 1 : 0.7;

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
      <div className="grid-top-left">
        <div className="first-row">
          <div className="result">
            <h1>Your Solar Results</h1>
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
            <Link className="link" to="/">
              Edit Inputs
            </Link>
          </div>
        </div>
      </div>
      <div className="grid-bottom-left">
        <div className="card">
          <ResultBenchmarks />
        </div>
        <div className="card card-map">
          <Map lat={coords.lat} lng={coords.lng} />
        </div>
        <div className="card">
          <EnergyOutput solarData={solarData} />
        </div>
        <div className="card">
          <Irradiance solarData={solarData} />
        </div>
      </div>
      <div className="grid-right">
        <div className="card card-roi">
          <ReturnOnInvestment solarData={solarData} />
        </div>
      </div>
    </div>
  );
}
