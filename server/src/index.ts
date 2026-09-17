import express from "express";

import {
  supabase,
} from "./lib/supabase.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const {
    data,
    error,
  } = await supabase
    .from("backend_test")
    .select("*");

  if (error) {
    console.error(
      "Supabase connection failed:",
      error
    );

    return res.status(500).json({
      status: "error",
      service: "vSSR backend",
      database: "unreachable",
    });
  }

  return res.json({
    status: "ok",
    service: "vSSR backend",
    database: "connected",
    data,
  });
});

app.listen(PORT, () => {
  console.log(`vSSR backend running on port ${PORT}`);
});