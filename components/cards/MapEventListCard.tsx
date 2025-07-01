import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { SupabaseEventType } from "@/types";

interface HomeEventCardProps {
  event: SupabaseEventType;
}

export default function HomeEventCard({ event }: HomeEventCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/meet/${event.id.toString()}`)}
    >
      <View style={styles.card}>
        {/* Left 90% Content */}
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
            {event.title}
          </Text>

          <Text style={styles.cardLocation} numberOfLines={1} ellipsizeMode="tail">
            📍 {event.street_address}, {event.city}, {event.postal_code}
          </Text>

          <Text style={styles.cardDates}>📅 {event.date_of_event}</Text>

          <Text style={styles.cardTime}>
            ⏰ {event.time_of_event} - {event.end_time_of_event}
          </Text>

          <Text style={styles.cardDescription} numberOfLines={2} ellipsizeMode="tail">
            {event.description} {"MapEventListCard"}
          </Text>
        </View>

        {/* Right 10% Side (Icons & Info) */}
        <View style={styles.cardIcons}>
          {/* Heart Icon */}
          <TouchableOpacity onPress={handleSave} style={styles.heartWrapper}>
            <FontAwesome
              color={isSaved ? "#ea266d" : "#fff"}
              name="heart"
              solid={isSaved}
              size={18}
            />
          </TouchableOpacity>

          {/* Price */}
          <View style={styles.priceWrapper}>
            <Text style={styles.cardPrice}>💰 €{event.ticket_price || 0}</Text>
          </View>

          {/* Attendees */}
          <View style={styles.attendeesWrapper}>
            <Text style={styles.cardAttendees}>👥 {event.number_of_attendees}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%", // Takes full available width
    alignSelf: "center",

  },
  card: {
    flexDirection: "row", // Split into 83-17 layout
    borderRadius: Colors.borderRadius,
    backgroundColor: Colors.background,
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 12,
    borderWidth: 1,
    borderColor: "black",

  },
  cardDetails: {
    flex: 8.3, // 83% of the space
    paddingRight: 10, // Space between text and icons
  },
  cardIcons: {
    flex: 1.7, // 17% of the space
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  cardLocation: {
    fontSize: 12,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardDates: {
    fontSize: 14,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardTime: {
    fontSize: 12,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    minHeight: 32, // Ensures consistent height
    maxHeight: 32,
    overflow: "hidden",
    color: Colors.text + "90",
  },
  heartWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  priceAttendeesWrapper: {
    flexDirection: "row", // Align price and attendees in the same row
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // Space between price and attendees
  },
  priceWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  cardPrice: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  attendeesWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  cardAttendees: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});
