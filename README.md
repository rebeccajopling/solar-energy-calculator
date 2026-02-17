A full-stack solar energy calculator designed to estimate a UK home's solar energy generation potential using location, roof characteristics, and real-world solar irradiance data.

The backend is built with Express and fetches data from Google Geocoding and PVGIS APIs. The front end is built with React + Vite.
<br>

### Key Features

---

#### 1. Custom Property Input

Capture user-specific property attributes:

- Postcode
- Roof size (m²)
- Roof type
- Roof orientation
- Number of floors
- Shading level

#### 2. Geolocation Mapping

The postcode is converted into precise latitude and longitude coordinates using the Google Geocoding API

#### 3. Solar Irradiance Data

Location-specific solar irradiance data is fetched from the PVGIS API

#### 4. Solar Output Calculation

Property characteristics are combined with local solar irradiance data to generate an estimated annual solar energy output (kWh/year)

#### 5. Results

- Overall solar potential rating (with metric breakdown)
- Annual energy production estimate
- Local irradiance and energy output data
- Property location map

#### 6. Estimated ROI _(WIP)_

Allow users to input current energy costs to estimate:

- Potential annual savings
- Estimated payback period
- Return on investment
  <br>

### Tech Stack

---

- Javascript
- React and React Router, Vite
- CSS
- Express
- Axios
- CORS
- Google Geocoding API
- PVGIS Solar Radiation API
