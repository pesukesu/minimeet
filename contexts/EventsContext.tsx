import { createContext, useContext, useState, useEffect } from "react";

import { supabase } from "@/config/supabase";

import {
  EventsContextType,
  SupabaseEventType,
  EventsLoadingState,
  SupabaseCategoryType,
} from "@/types";

import { useAuthenticatedUser } from "@/contexts/AuthContext";

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
  const { userProfile } = useAuthenticatedUser();

  const [allEvents, setAllEvents] = useState<SupabaseEventType[]>([]);
  const [allEventCategories, setAllEventCategories] = useState<
    SupabaseCategoryType[]
  >([]);
  const [loadingState, setLoadingState] = useState<EventsLoadingState>({
    events: "fetching",
    categories: "fetching",
    creators: "fetching",
  });

  // Get all the events for the users current city

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

  // Fetch all the event categories
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
      data.map((item) => item.title).join(", ") //print all event categories
    );
  }

  // Get a single event by id

  function getEventById(id: string | string[]) {
    const searchId = Array.isArray(id) ? id[0] : id;
    return allEvents.find((event) => event.id.toString() === searchId);
  }

  // function to create a new event

  async function createNewEvent(
    event: Omit<
      SupabaseEventType,
      "id" | "created_at" | "updated_at" | "host_id"
    >
  ) {
    console.log("Creating new event...");
    const currentUserId = userProfile.user_id;

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
