import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SupabaseEventType } from "@/types";

export default function WideEventCard({ event }: { event: SupabaseEventType }) {
  return (
    <TouchableOpacity
      key={event.id}
      onPress={() => router.push(`/meet/${event.id.toString()}`)}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardAddress}>📍 {event.street_address}, {event.city}, {event.postal_code}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowItemText}>📅 {event.date_of_event}</Text>
              <Text style={styles.cardRowItemText}>⏰ {event.time_of_event} - {event.end_time_of_event}</Text>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Image
              alt="Category Icon"
              resizeMode="cover"
              source={{ uri: event.image || "https://rnofijizfghsdoyrcnlo.supabase.co/storage/v1/object/public/Event%20Images//defaultEvent.png" }}
              style={styles.cardImg}
            />
            <Text style={styles.cardRowItemText}>👥 {event.number_of_attendees}</Text>
            <Text style={styles.cardRowItemText}>💰 €{event.ticket_price || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: "#fff",
    paddingTop: 2,
    paddingRight: 6,
    paddingBottom: 2,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLeft: {
    width: "80%",
  },
  cardRight: {
    width: "20%",
    alignItems: "flex-end",
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardRowItemText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#333",
  },
});
