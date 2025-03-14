import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";

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
        <View style={styles.cardTop}>
          <Image
            alt="Event Image"
            resizeMode="cover"
            style={styles.cardImg}
            source={{ uri: event.image }}
          />

          {/* Heart Icon (Save) */}
          <View style={styles.cardLikeWrapper}>
            <TouchableOpacity onPress={handleSave}>
              <View style={styles.cardLike}>
                <FontAwesome
                  color={isSaved ? "#ea266d" : "#fff"}
                  name="heart"
                  solid={isSaved}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Price (Bottom Left) */}
          <View style={styles.priceWrapper}>
            <Text style={styles.cardPrice}>💰 €{event.ticket_price || 0}</Text>
          </View>

          {/* Attendees (Bottom Right) */}
          <View style={styles.attendeesWrapper}>
            <Text style={styles.cardAttendees}>👥 {event.number_of_attendees}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{event.title}</Text>

          <Text style={styles.cardLocation}>
            📍 {event.street_address}, {event.city}, {event.postal_code}
          </Text>

          <Text style={styles.cardDates}>📅 {event.date_of_event}</Text>

          <Text style={styles.cardTime}>
            ⏰ {event.time_of_event} - {event.end_time_of_event}
          </Text>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.cardDescription}
          >
            {event.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    position: "relative",
    borderRadius: Colors.borderRadius,
    backgroundColor: Colors.background,
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 12,
  },
  cardTop: {
    borderTopLeftRadius: Colors.borderRadius,
    borderTopRightRadius: Colors.borderRadius,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: Colors.borderRadius,
    borderTopRightRadius: Colors.borderRadius,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.text,
  },
  cardLocation: {
    fontSize: 14,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardDates: {
    fontSize: 16,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardTime: {
    fontSize: 14,
    color: Colors.text + "80",
    marginTop: 4,
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 18, // Ensures it properly takes 2 lines
    maxHeight: 36,  // 2 lines x 18px lineHeight
    overflow: "hidden",
    color: Colors.text + "90",
  },
  cardLikeWrapper: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  priceWrapper: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  cardPrice: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  attendeesWrapper: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  cardAttendees: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});

