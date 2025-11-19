import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

app.get("/api/solar", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Missing lat or lon" });
    }

    const url = `https://re.jrc.ec.europa.eu/api/v5_3/PVcalc?lat=${lat}&lon=${lon}&peakpower=1&loss=14&tracking=0&angle=35&aspect=180&outputformat=json`;

    const response = await fetch(url);
    const text = await response.text();
    console.log("PVGIS raw response:", text);

    if (!response.ok) {
      // Return the raw PVGIS response for debugging
      return res
        .status(response.status)
        .json({ error: "PVGIS API error", raw: text });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse PVGIS response:", err);
      return res.status(500).json({ error: "Invalid PVGIS JSON", raw: text });
    }

    // Check if the response has the expected structure
    if (!data.inputs || !data.inputs.location) {
      console.warn("PVGIS returned unexpected structure:", data);
      return res
        .status(500)
        .json({ error: "PVGIS returned invalid data", raw: data });
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
