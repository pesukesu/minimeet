import { Session, User } from "@supabase/supabase-js";

// Types for the 2 different contexts that we have in our app

export type EventsContextType = {
  allEventsForCurrentCity: SupabaseEventType[];
  allEventsForCurrentUser: SupabaseEventType[];
  eventCategories: SupabaseCategoryType[];
  getEventById: (id: string | string[]) => SupabaseEventType | undefined;
  createNewEvent: (event: SupabaseEventType) => Promise<void>;
  status: EventsLoadingState;
};

export type AuthContextType = {
  session: Session | null;
  userProfile: UserProfile | null;
  getSingleUserProfile: (userId: string) => Promise<UserProfile | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userProfileData: UserProfile) => Promise<void>; // Add this line
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

