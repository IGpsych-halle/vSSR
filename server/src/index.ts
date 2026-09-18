import express from "express";

import {
  supabase,
} from "./lib/supabase.js";

import {
  requireAuth,
  type AuthenticatedRequest,
} from "./middleware/requireAuth.js";

import {
  characterRouter,
} from "./routes/character.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  "/api/character",
  characterRouter
);

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

app.get(
  "/api/me",
  requireAuth,
  (req, res) => {
    const authenticatedReq =
      req as AuthenticatedRequest;


    return res.json({
      user: {
        id: authenticatedReq.user.id,
        email: authenticatedReq.user.email,
      },
    });
  }
);

app.listen(PORT, () => {
  console.log(`vSSR backend running on port ${PORT}`);
});