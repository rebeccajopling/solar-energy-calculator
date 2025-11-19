import { useState, useEffect } from "react";
import Map from "../Map/Map";

export default function SolarResult({
  postcode,
  roofSize,
  roofType,
  roofOrientation,
  shading,
}) {
  const [coords, setCoords] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const [error, setError] = useState(null);
  const [showRatingContent, setShowRatingContent] = useState(false);

  const getSolarRating = (kWh) => {
    if (kWh >= 4000) return "Excellent";
    if (kWh >= 3000) return "Good";
    if (kWh >= 2000) return "Average";
    return "Poor";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postcode || !roofSize || !roofType || !roofOrientation || !shading)
          return;

        // Get coordinates for postcode
        const geoRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`
        );
        const geoData = await geoRes.json();
        console.log("Google Maps API response:", geoData);

        if (!geoData.results?.length) {
          setError("No coordinates found for this postcode");
          return;
        }

        const { lat, lng } = geoData.results[0].geometry.location;
        setCoords({ lat, lng });

        // Get PVGIS solar data from backend
        const pvgisRes = await fetch(
          `http://localhost:3001/api/solar?lat=${lat}&lon=${lng}`
        );
        const pvgisData = await pvgisRes.json();
        console.log("PVGIS response:", pvgisData);

        const annualSunHours = pvgisData.outputs.totals.fixed["H(i)_y"] || 1200;

        // Calculate base solar potential (kWh/year)
        const basePotential = roofSize * 0.18 * annualSunHours;

        // Factor in roofType
        const roofTypeFactor = roofType === "Flat" ? 0.9 : 1;

        // Factor in roofOrientation
        const orientationFactor = {
          South: 1,
          East: 0.9,
          West: 0.9,
          North: 0.8,
        }[roofOrientation];

        // Factor in shading
        const shadingFactor = {
          "No Shading": 1,
          "Partial Shading": 0.85,
          "Heavy Shading": 0.7,
        }[shading];

        const adjustedPotential =
          basePotential * roofTypeFactor * orientationFactor * shadingFactor;

        setSolarData({ annualSunHours, adjustedPotential });
      } catch (err) {
        console.error("Error fetching solar data:", err);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();
  }, [postcode, roofSize, roofType, roofOrientation, shading]);

  if (error) return <p>{error}</p>;
  if (!solarData || !coords) return <p>Loading...</p>;

  let detailsTable = null;
  if (showRatingContent) {
    detailsTable = (
      <table className="ratings-content-table">
        <thead>
          <tr>
            <th>Rating</th>
            <th>kWh/year</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Excellent</td>
            <td>≥ 4000</td>
            <td>Very high solar potential, ideal roof</td>
          </tr>
          <tr>
            <td>Good</td>
            <td>3000 - 3999</td>
            <td>Good potential, will cover significant energy usage</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>2000 - 2999</td>
            <td>Moderate potential, some savings expected</td>
          </tr>
          <tr>
            <td>Poor</td>
            <td>&lt; 2000</td>
            <td>Low potential, roof not ideal for solar</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <Map lat={coords.lat} lng={coords.lng} />
      <p>Result: {getSolarRating(solarData.adjustedPotential)}</p>
      <p>
        With approximately {solarData.annualSunHours} hours of sunlight per
        year, your roof can generate around{" "}
        {solarData.adjustedPotential.toFixed(0)} kWh of solar energy annually.
      </p>
      <p
        className="toggle-details"
        onClick={() => setShowRatingContent(!showRatingContent)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {showRatingContent ? "Hide details" : "Show more context"}
      </p>

      {detailsTable}
    </div>
  );
}
