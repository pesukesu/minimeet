import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/config/supabase";
import {
  EventsContextType,
  SupabaseEventType,
  EventsLoadingState,
  SupabaseCategoryType,
} from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const EventsAndDataContext = createContext<EventsContextType>({
  allEventsForCurrentCity: [],
  allEventsForCurrentUser: [],
  eventCategories: [],
  getEventById: () => undefined,
  createNewEvent: async () => {},
  status: {
    events: "fetching",
    categories: "fetching",
    creators: "fetching",
  },
});

export const EventsAndDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userProfile } = useAuth();

  // If userProfile is null, fall back to default
  const safeUserProfile = userProfile ?? { user_id: "e70f8b2a-fdc4-4fd2-9747-f5a0c5ff1042", email: "" };

  // Now use `userProfile` if available, otherwise fall back to `safeUserProfile`
  const currentUserProfile = userProfile ? userProfile : safeUserProfile;

  // Log which profile is being used for debugging purposes
  if (userProfile) {
    console.log("Using actual user profile:", currentUserProfile.user_id);
  } else {
    console.log("Using fallback safe user profile:", currentUserProfile.user_id);
  }

  const [allEvents, setAllEvents] = useState<SupabaseEventType[]>([]);
  const [allEventCategories, setAllEventCategories] = useState<SupabaseCategoryType[]>([]);
  const [loadingState, setLoadingState] = useState<EventsLoadingState>({
    events: "fetching",
    categories: "fetching",
    creators: "fetching",
  });

  async function fetchAllMiniMeets() {
    console.log("Fetching all MiniMeets...");
    setLoadingState((prev) => ({ ...prev, events: "fetching" }));
    const { data, error } = await supabase.from("Events").select("*");

    if (error) {
      setLoadingState((prev) => ({ ...prev, events: "error" }));
      console.error("Error fetching MiniMeets:", error);
      return;
    }
    setAllEvents(data as SupabaseEventType[]);
    setLoadingState((prev) => ({ ...prev, events: "complete" }));
    console.log("Successfully fetched MiniMeets:", data.length, "events found");
  }

  async function fetchAllEventCategories() {
    console.log("Fetching event categories...");
    setLoadingState((prev) => ({ ...prev, categories: "fetching" }));
    const { data, error } = await supabase.from("Categories").select("*");

    if (error) {
      setLoadingState((prev) => ({ ...prev, categories: "error" }));
      console.error("Error fetching categories:", error);
      return;
    }
    setAllEventCategories(data);
    setLoadingState((prev) => ({ ...prev, categories: "complete" }));
    console.log(
      "Successfully fetched categories:",
      data.length,
      "categories found:",
      data.map((item) => item.title).join(", ")
    );
  }

  function getEventById(id: string | string[]) {
    const searchId = Array.isArray(id) ? id[0] : id;
    return allEvents.find((event) => event.id.toString() === searchId);
  }

  async function createNewEvent(event: Omit<SupabaseEventType, "id" | "created_at" | "updated_at" | "host_id">) {
    console.log("Creating new event...");
    const currentUserId = currentUserProfile.user_id; // Use the actual userProfile or fallback

    if (!currentUserId) {
      console.error("Error: User must be logged in to create an event");
      throw new Error("User must be logged in to create an event");
    }

    const { data, error } = await supabase
      .from("Events")
      .insert([{ ...event, host_id: currentUserId }])
      .select();

    if (error) {
      console.error("Error creating new event:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error("Error: No data returned from insert operation");
      throw new Error("No data returned from insert operation");
    }

    const newEvent = data[0] as SupabaseEventType;
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log("Successfully created new event:", newEvent.title);
    return newEvent;
  }

  useEffect(() => {
    async function initializeData() {
      await Promise.all([fetchAllMiniMeets(), fetchAllEventCategories()]);
    }
    initializeData();
  }, []);

  const value: EventsContextType = {
    allEventsForCurrentCity: allEvents,
    allEventsForCurrentUser: [],
    status: loadingState,
    eventCategories: allEventCategories,
    getEventById,
    createNewEvent: async (event: SupabaseEventType) => {
      await createNewEvent(event);
    },
  };

  return (
    <EventsAndDataContext.Provider value={value}>
      {children}
    </EventsAndDataContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsAndDataContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
