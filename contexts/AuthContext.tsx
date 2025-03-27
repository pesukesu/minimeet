// contexts/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";
import { AuthContextType, LoadingStatus, UserProfile } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<LoadingStatus>("fetching");

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      setStatus("fetching");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
          const userData = await fetchUserData(session.user.id);
          setUserProfile({ ...session.user, ...userData });
          console.log("User profile set:", { ...session.user, ...userData });
        }
        setStatus("complete");
      } catch (error) {
        setStatus("error");
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSessionAndUser();



    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setStatus("fetching");
      try {
        setSession(session);
        if (session?.user) {
          const userData = await fetchUserData(session.user.id);
          setUserProfile({ ...session.user, ...userData });
        }
        setStatus("complete");
      } catch (error) {
        setStatus("error");
        console.error("Error during auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed:", error);
      throw error;
    }
  };

// Update user profile function
const updateUserProfile = async (userProfileData: Partial<UserProfile>) => {
  if (!session?.user) {
    console.error("No user session available");
    return;
  }

  // Ensure that the user_id is set
  const updatedData = {
    ...userProfileData,
    user_id: session.user.id, // Ensure user_id is always included
  };

  // Only include fields that have actually been modified
  const updateFields = Object.fromEntries(
    Object.entries(updatedData).filter(([key, value]) => value !== undefined)
  );

  const { error } = await supabase
    .from("Users")
    .update(updateFields)  // Use the filtered updateFields object to only update modified fields
    .eq("user_id", session.user.id)  // Make sure the update targets the correct user
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }

  // Update local state after a successful update
  setUserProfile({ ...session.user, ...userProfileData });
};

  const value: AuthContextType = {
    session,
    userProfile,
    getSingleUserProfile: fetchUserData,
    signIn,
    signOut,
    updateUserProfile, // Added here
    loading,
    status,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
