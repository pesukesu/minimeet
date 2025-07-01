import { Session, User } from "@supabase/supabase-js";

// Types for the 2 different contexts that we have in our app

export type EventsContextType = {
  allEventsForCurrentCity: SupabaseEventType[];
  allEventsForCurrentUser: SupabaseEventType[];
  eventCategories: SupabaseCategoryType[];
  getEventById: (id: string | string[]) => SupabaseEventType | undefined;
  createNewEvent: (event: SupabaseEventType) => Promise<void>;
  hasLiked: (eventId: string) => boolean,
  toggleLike: (eventId: string) => Promise<void>,
  status: EventsLoadingState;
};

export type AuthContextType = {
  session: Session | null;
  userProfile: UserProfile | null;
  userSettings: UserSettings | null; // Add this field to hold user settings
  getSingleUserProfile: (userId: string) => Promise<UserProfile | null>;
  getUserSettings: (userId: string) => Promise<UserSettings | null>; // Method to fetch user settings
  updateUserSettings: (userId: string, userSettingsData: UserSettings) => Promise<void>; // Method to update user settings
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userProfileData: UserProfile) => Promise<void>;
  loading: boolean;
  status: LoadingStatus;
};

export type LoadingStatus = "fetching" | "complete" | "error";

export type EventsLoadingState = {
  events: LoadingStatus;
  categories: LoadingStatus;
  creators: LoadingStatus;
};

// Types for the Supabase tables

export type SupabaseEventType = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image: string;
  city: string;
  street_address: string;
  postal_code: string;
  number_of_attendees: number;
  date_of_event: string;
  time_of_event: string;
  end_time_of_event: string;
  host_id: string;
  category: string;
  ticket_price: number;
};

export interface EventWithCoordinates extends SupabaseEventType {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type SupabaseCategoryType = {
  id: number;
  created_at: string;
  title: string;
  image: string;
};

// Types for the User Profile, also coming from Supabase
export interface UserProfile {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  top_creator?: boolean;
  user_profile_description?: string;
  company_name?: string;
  job_title?: string;
  hometown?: string;
}

export interface UserSettings {
  user_id: string; // assuming each user has one set of settings
  notifications_enable: boolean;
  dark_mode: boolean;
  language: string;
  timezone: string;
  // Add any other settings that exist in your user_settings table
}
export type SupabaseEventParticipantsType = {
  id: number;
  event_id: number;      // foreign key to Events.id
  user_id: string;       // foreign key to auth.users.id
  liked: boolean;        // new field to track likes
  status?: string | null; // optional, for RSVP or other status info
  created_at?: string;   // optionally add timestamps if you have them
  updated_at?: string;
};