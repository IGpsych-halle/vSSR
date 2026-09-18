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

export const inventoryRouter =
  Router();

inventoryRouter.get(
  "/",
  requireAuth,
  async (req, res) => {
    const authenticatedReq =
      req as AuthenticatedRequest;


    // Character des eingeloggten Users finden
    const {
      data: character,
      error: characterError,
    } = await supabase
      .from("characters")
      .select("id")
      .eq(
        "user_id",
        authenticatedReq.user.id
      )
      .maybeSingle();


    if (characterError) {
      console.error(
        "Failed to load character:",
        characterError
      );

      return res.status(500).json({
        error: "Failed to load character",
      });
    }


    if (!character) {
      return res.status(404).json({
        error: "Character not found",
      });
    }


    // Inventory des Characters laden
    const {
      data: stacks,
      error: inventoryError,
    } = await supabase
      .from("inventory_stacks")
      .select(
        "id, slot_index, item_type, amount"
      )
      .eq(
        "character_id",
        character.id
      )
      .order(
        "slot_index",
        {
          ascending: true,
        }
      );


    if (inventoryError) {
      console.error(
        "Failed to load inventory:",
        inventoryError
      );

      return res.status(500).json({
        error: "Failed to load inventory",
      });
    }


    return res.json({
      inventory: stacks,
    });
  }
);