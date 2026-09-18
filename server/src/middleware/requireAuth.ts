import type {
  NextFunction,
  Request,
  Response,
} from "express";

import type {
  User,
} from "@supabase/supabase-js";

import {
  supabase,
} from "../lib/supabase.js";


export type AuthenticatedRequest =
  Request & {
    user: User;
  };


export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization =
    req.headers.authorization;


  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Missing access token",
    });
  }


  const accessToken =
    authorization.slice(
      "Bearer ".length
    );


  const {
    data,
    error,
  } = await supabase.auth.getUser(
    accessToken
  );


  if (error || !data.user) {
    return res.status(401).json({
      error: "Invalid access token",
    });
  }


  (
    req as AuthenticatedRequest
  ).user = data.user;


  next();
}