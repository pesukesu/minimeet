import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useEvents } from "@/contexts/EventsContext";

type EventType = {
  id: number;
  title: string;
  street_address: string;
  city: string;
  date_of_event: string;
  time_of_event: string;
  end_time_of_event?: string;
  image?: string;
  number_of_attendees?: number;
  ticket_price?: number;
};

const tabs = [
  { name: "Going" },
  { name: "Interested" },
  { name: "Hosting" },
  { name: "History" },
];

export default function EventTabs() {
  const [value, setValue] = useState(0);
  const { allEventsForCurrentCity } = useEvents();
  const router = useRouter();

  const attendingEvents = allEventsForCurrentCity || [];
  const interestedEvents = allEventsForCurrentCity?.slice(0, 3) || [];
  const hostingEvents = allEventsForCurrentCity?.slice(1, 4) || [];
  const historyEvents = allEventsForCurrentCity?.slice(2, 5) || [];

  const eventLists = [attendingEvents, interestedEvents, hostingEvents, historyEvents];
  const selectedEvents = eventLists[value];

  const formatDate = (dateString?: string): string =>
    dateString ? new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";

  const formatTime = (timeString?: string): string => {
    if (!timeString) return "-";
    
    const [hours, minutes] = timeString.split(":"); // Extract HH and MM
    return `${hours}:${minutes}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {tabs.map((item, index) => (
          <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => setValue(index)}>
            <View style={[styles.item, index === value && { backgroundColor: "#e0e7ff" }]}>
              <Text style={[styles.text, index === value && { color: "#4338ca" }]}>
                {item.name} ({eventLists[index].length})
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={selectedEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: EventType }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => router.push(`/meet/${item.id.toString()}`)}
          >
            <View style={styles.eventLeft}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventLocation}>📍 {item.street_address}, {item.city}</Text>
              <Text style={styles.eventMeta}>
                📅 {formatDate(item.date_of_event)} • 🕒 {formatTime(item.time_of_event)} - {formatTime(item.end_time_of_event)}
              </Text>
            </View>

            <View style={styles.eventRight}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.eventImage} />
              )}
              <Text style={styles.eventAttendees}>👥 {item.number_of_attendees ?? "-"}</Text>
              <Text style={styles.eventPrice}>💰 ${item.ticket_price ?? "-"}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noEvents}>No events found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 6,
    margin: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
  },
  eventLeft: {
    flex: 4,
    justifyContent: "center",
  },
  eventRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  eventLocation: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  eventMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  eventImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 4,
  },
  eventAttendees: {
    fontSize: 14,
    color: "#666",
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  noEvents: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});