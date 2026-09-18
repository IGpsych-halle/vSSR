import {
  Router,
} from "express";

import {
  supabase,
} from "../lib/supabase.js";

import {
  requireAuth,
  type AuthenticatedRequest,
} from "../middleware/requireAuth.js";


export const characterRouter =
  Router();


characterRouter.get(
  "/",
  requireAuth,
  async (req, res) => {
    const authenticatedReq =
      req as AuthenticatedRequest;


    const {
      data,
      error,
    } = await supabase
      .from("characters")
      .select("*")
      .eq(
        "user_id",
        authenticatedReq.user.id
      )
      .maybeSingle();


    if (error) {
      console.error(
        "Failed to load character:",
        error
      );

      return res.status(500).json({
        error: "Failed to load character",
      });
    }


    return res.json({
      character: data,
    });
  }
);

characterRouter.post(
  "/",
  requireAuth,
  async (req, res) => {
    const authenticatedReq =
      req as AuthenticatedRequest;

    const {
      displayName,
    } = req.body;


    if (
      typeof displayName !== "string" ||
      displayName.trim().length < 2
    ) {
      return res.status(400).json({
        error: "Invalid display name",
      });
    }


    const cleanDisplayName =
      displayName.trim();


    const {
      data,
      error,
    } = await supabase
      .from("characters")
      .insert({
        user_id:
          authenticatedReq.user.id,
        display_name:
          cleanDisplayName,
      })
      .select("*")
      .single();


    if (error) {
        if (error.code === "23505") {
            return res.status(409).json({
            error: "Character already exists",
            });
        }

        console.error(
            "Failed to create character:",
            error
        );

        return res.status(500).json({
            error: "Failed to create character",
        });
    }


    return res.status(201).json({
      character: data,
    });
  }
);