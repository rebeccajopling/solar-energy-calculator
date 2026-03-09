A full-stack solar energy calculator designed to estimate a UK home's solar energy generation potential using location, roof characteristics, and real-world solar irradiance data.

The application integrates Postcodes.io for postcode geocoding, PVGIS for solar irradiation data, and the Google Maps JavaScript API to visualise the property location on an interactive map. The backend is built with Node.js and Express, while the frontend is built with React and Vite.

Solar estimates are calculated by combining PVGIS irradiance data with user inputs such as roof size, roof orientation, roof type, and shading conditions to produce an adjusted annual energy output estimate.
<br>

### Key Features

---

#### 1. Custom Property Input

Users enter their unique property details:

- Postcode
- Roof size (m²)
- Roof type
- Roof orientation
- Number of floors
- Shading level

#### 2. Geolocation Mapping

The user's postcode is converted into precise latitude and longitude coordinates using the Postcodes.io API

#### 3. Solar Irradiance Data

Location-specific solar irradiance data is fetched from the PVGIS API using the coordinates

#### 4. Solar Output Calculation

Property characteristics are combined with local solar irradiance data to generate an estimated annual solar energy output (kWh/year)

#### 5. Results

Users can view their:

- Overall solar potential rating (with a metric breakdown)
- Annual energy production estimate
- Local irradiance and energy output data
- Property location visualised on an interactive Google Maps map

#### 6. Estimated ROI _(WIP)_

Users can input their current energy costs to estimate:

- Potential annual savings
- Estimated payback period
- Return on investment
  <br>

### Tech Stack

---

Frontend

- Javascript
- React and React Router, Vite
- CSS
- Google Maps Javascript API

Backend

- Node.js
- Express
- Axios
- CORS

APIs

- Postcodes.io API (postcode → lat/lon geocoding)
- PVGIS Solar Radiation API
