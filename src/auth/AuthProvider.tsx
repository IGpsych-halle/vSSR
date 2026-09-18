import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  Session,
  User,
} from "@supabase/supabase-js";

import {
  supabase,
} from "../lib/supabase";


type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};


export const AuthContext =
  createContext<AuthContextValue | null>(
    null
  );


type AuthProviderProps = {
  children: ReactNode;
};


export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setLoading(false);
      });


    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setLoading(false);
        }
      );


    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const user =
    session?.user ?? null;


  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}