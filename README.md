A full-stack solar energy calculator designed to estimate a UK home's solar energy generation potential using location, roof characteristics, and real-world solar irradiance data.

The backend is built with Express and fetches data from Google Geocoding and PVGIS APIs. The front end is built with React + Vite.
<br>

### Key Features

---

- Users can enter their unique property details, including postcode, roof size, roof type, roof orientation, number of floors, and shading level.
- The user’s postcode is converted into precise latitude and longitude coordinates using the Google Geocoding API.
- Location-based solar irradiance data is pulled from the PVGIS API.
- The user’s property characteristics are combined with the local solar irradiance data to calculate an estimated annual solar energy output in kWh/year
- Users can view their:

* Overall solar potential rating (with a guide to the rating metrics)
* Annual energy production estimate
* Local irradiance metrics
* Energy output breakdown
* A map showing their property location
* Return on Investment (Feature WIP) where users can enter their current energy rating in order to estimate the potential financial savings and payback period of investing in solar panels
  <br>

### Tech Stack

---

- Javascript
- React, React Router, Vite
- CSS
- Express
- Axios
- CORS
- Google Geocoding API
- PVGIS Solar Radiation API
