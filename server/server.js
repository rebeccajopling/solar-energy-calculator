import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/api/solar", async (req, res) => {
  try {
    const { postcode } = req.query;

    if (!postcode) {
      return res.status(400).json({ error: "Postcode is required" });
    }

    // Fetch lat/lon from postcodes.io
    const geoRes = await axios.get(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`,
    );

    if (!geoRes.data.result) {
      return res.status(400).json({ error: "Invalid postcode" });
    }

    const latitude = geoRes.data.result.latitude;
    const longitude = geoRes.data.result.longitude;

    // fetch PVGIS data
    const url = `https://re.jrc.ec.europa.eu/api/v5_3/PVcalc?lat=${latitude}&lon=${longitude}&peakpower=1&loss=14&tracking=0&angle=35&aspect=180&outputformat=json`;

    const response = await axios.get(url);

    if (!response.data.inputs?.location) {
      return res.status(500).json({ error: "Invalid PVGIS data" });
    }

    res.json({
      solar: response.data,
      latitude,
      longitude,
    });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
