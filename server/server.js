import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/solar", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Missing lat or lon" });
    }

    const url = `https://re.jrc.ec.europa.eu/api/v5_3/PVcalc?lat=${lat}&lon=${lon}&peakpower=1&loss=14&tracking=0&angle=35&aspect=180&outputformat=json`;

    let response;
    try {
      response = await axios.get(url, {
        transformResponse: [(data) => data],
      });
    } catch (err) {
      console.error("PVGIS request failed:", err.response?.data || err.message);
      return res.status(500).json({
        error: "PVGIS API error",
        raw: err.response?.data || err.message,
      });
    }

    const text = response.data;
    console.log("PVGIS raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse PVGIS response:", error);
      return res.status(500).json({ error: "Invalid PVGIS JSON", raw: text });
    }

    if (!data.inputs || !data.inputs.location) {
      console.warn("PVGIS returned unexpected structure:", data);
      return res.status(500).json({
        error: "PVGIS returned invalid data",
        raw: data,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
