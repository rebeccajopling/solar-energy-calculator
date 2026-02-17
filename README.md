A full-stack solar energy calculator designed to estimate a UK home's solar energy generation potential using location, roof characteristics, and real-world solar irradiance data.

The backend is built with Express and fetches data from Google Geocoding and PVGIS APIs. The front end is built with React + Vite.
<br>

### Key Features

---

#### Custom Property Input

Users enter detailed property information, including postcode, roof size, roof type, roof orientation, number of floors, and shading level.

#### Accurate Location Mapping

The postcode is converted into precise latitude and longitude coordinates using the Google Geocoding API.

#### Real-Time Solar Data Integration

Location-specific solar irradiance data is retrieved from the PVGIS API.

#### Personalised Energy Output Calculation

Property characteristics are combined with local solar irradiance data to generate an estimated annual solar energy output (kWh/year).

#### Comprehensive Solar Insights

Users can view:

- Overall solar potential rating (with an breakdown of rating metrics)
- Estimated annual energy production
- Local solar irradiance and energy output metrics
- A map showing their property location

#### Return on Investment (Work in Progress)

Users can enter their current energy costs to estimate potential financial savings and calculate the expected payback period for installing solar panels.
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
