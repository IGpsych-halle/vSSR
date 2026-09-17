import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "vSSR backend"
  });
});

app.listen(PORT, () => {
  console.log(`vSSR backend running on port ${PORT}`);
});