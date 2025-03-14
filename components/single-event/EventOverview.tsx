import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
import { formatDescription, formatDate, formatTime } from "@/config/helpers";
import { SupabaseEventType } from "@/types";

export default function EventOverview({ event }: { event: SupabaseEventType }) {
  const formattedDescription = formatDescription(event.description);
  const formattedDate = formatDate(event.date_of_event);
  const formattedTime = formatTime(event.time_of_event);
  const formattedEndTime = formatTime(event.end_time_of_event);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.photos}>
        <Image alt="Event Image" source={{ uri: event.image }} style={styles.photosImg} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{event.title}</Text>
        <View style={styles.headerLocation}>
          <FeatherIcon color="#7B7C7E" name="map-pin" size={16} />
          <Text style={styles.headerLocationText}>{event.city}, {event.street_address}, {event.postal_code}</Text>
        </View>
        <Text style={styles.headerPrice}>{event.ticket_price > 0 ? `$${event.ticket_price}` : "Free"}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <FontAwesome color="#7B7C7E" name="laptop" size={18} />
          <Text style={styles.statsItemText}>{event.category}</Text>
        </View>
        <View style={styles.statsItem}>
          <FontAwesome color="#7B7C7E" name="calendar" size={18} />
          <Text style={styles.statsItemText}>{formattedDate}</Text>
        </View>
        <View style={styles.statsItem}>
          <FeatherIcon color="#7B7C7E" name="clock" size={18} />
          <Text style={styles.statsItemText}>{formattedTime} - {formattedEndTime}</Text>
        </View>
        <View style={styles.statsItem}>
          <FontAwesome color="#7B7C7E" name="users" size={18} />
          <Text style={styles.statsItemText}>{event.number_of_attendees} Attendees</Text>
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About This Event</Text>
        <Text style={styles.aboutDescription}>{formattedDescription}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 160,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  photos: {
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  photosImg: {
    width: "100%",
    height: "100%",
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 24,
    color: "#242329",
    marginBottom: 8,
  },
  headerLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLocationText: {
    fontSize: 14,
    color: "#7B7C7E",
    marginLeft: 6,
  },
  headerPrice: {
    fontWeight: "700",
    fontSize: 22,
    color: "#f26463",
  },
  stats: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statsItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#242329",
  },
  about: {
    marginBottom: 40,
  },
  aboutTitle: {
    fontWeight: "700",
    fontSize: 22,
    color: "#242329",
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 14,
    color: "#7B7C7E",
    lineHeight: 22,
  },
});
