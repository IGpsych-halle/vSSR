import {
  supabase,
} from "../lib/supabase";


export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const {
    data: {
      session,
    },
  } = await supabase.auth.getSession();


  if (!session) {
    throw new Error(
      "User is not authenticated"
    );
  }


  const headers =
    new Headers(options.headers);

  headers.set(
    "Authorization",
    `Bearer ${session.access_token}`
  );


  if (
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }


  return fetch(path, {
    ...options,
    headers,
  });
}