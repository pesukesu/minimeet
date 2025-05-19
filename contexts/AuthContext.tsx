import React, { createContext, useState, useContext, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";
import { AuthContextType, LoadingStatus, UserProfile, UserSettings } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<LoadingStatus>("fetching");

  const fetchUserData = async (userId: string) => {
    console.log("Fetching user data for user_id:", userId);
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
    console.log("Fetched user data:", data);
    return data;
  };

  const fetchUserSettings = async (userId: string) => {
    console.log("Fetching user settings for user_id:", userId);
    
    // Log query execution
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId);

    console.log("Raw fetched user settings response:", data);
    
    if (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }
    if (!data || data.length === 0) {
      console.warn("No user settings found for user_id:", userId);
      return null;
    }
    console.log("Fetched user settings data:", data[0]);
    return data[0];
  };

  const updateUserSettings = async (userId: string, userSettingsData: UserSettings) => {
    console.log("Updating user settings for user_id:", userId, "with data:", userSettingsData);
    const { error } = await supabase
      .from("user_settings")
      .update(userSettingsData)
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user settings:", error);
      throw error;
    }

    console.log("Successfully updated user settings.");
    setUserSettings((prev) => ({ ...prev, ...userSettingsData }));
  };

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      setStatus("fetching");
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session?.user) {
          const userId = session.user.id;
          console.log("Session found, user_id:", userId);
          const userData = await fetchUserData(userId);
          const settingsData = await fetchUserSettings(userId);
          setUserProfile({ ...session.user, ...userData });
          setUserSettings(settingsData);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setStatus("fetching");
      try {
        setSession(session);
        if (session?.user) {
          const userId = session.user.id;
          console.log("Auth state changed, new user_id:", userId);
          const userData = await fetchUserData(userId);
          const settingsData = await fetchUserSettings(userId);
          setUserProfile({ ...session.user, ...userData });
          setUserSettings(settingsData);
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateUserProfile = async (userProfileData: Partial<UserProfile>) => {
    if (!session?.user) {
      console.error("No user session available");
      return;
    }

    const updateFields = Object.fromEntries(
      Object.entries(userProfileData).filter(([_, value]) => value !== undefined)
    );

    console.log("Updating user profile for user_id:", session.user.id, "with data:", updateFields);
    const { error } = await supabase
      .from("Users")
      .update(updateFields)
      .eq("user_id", session.user.id)
      .single();

    if (error) throw error;
    console.log("Successfully updated user profile.");
    setUserProfile((prev) => ({ ...prev, ...userProfileData }));
  };

  const value: AuthContextType = {
    session,
    userProfile,
    userSettings,
    getSingleUserProfile: fetchUserData,
    getUserSettings: fetchUserSettings,
    updateUserSettings,
    signIn,
    signOut,
    updateUserProfile,
    loading,
    status,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
