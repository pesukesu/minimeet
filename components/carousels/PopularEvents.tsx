import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import HomeEventCard from "../cards/HomeEventCard";
import { useEvents } from "@/contexts/EventsContext";

const { width: screenWidth } = Dimensions.get("window");

export default function PopularEvents() {
  const { allEventsForCurrentCity, eventCategories, status } = useEvents();

  if (status.categories === "fetching") {
    return <Text>Loading categories...</Text>;
  }

  if (status.categories === "error") {
    return <Text>Failed to load categories.</Text>;
  }

  return (
    <View style={styles.container}>
      {eventCategories.map((category) => {
        const formattedCategory = category.title.trim().toLowerCase(); // Use dynamic category title

        const filteredEvents = allEventsForCurrentCity.filter((event) => {
          if (!event.category) return false;
          const eventCategory = String(event.category).trim().toLowerCase();
          return eventCategory === formattedCategory;
        });

        if (filteredEvents.length === 0) return null;

        return (
          <View key={category.id} style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{category.title}</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {filteredEvents.map((event, index) => (
                <View key={event.id ? `${event.id}-${category.id}` : `${category.id}-${index}`} style={styles.cardWrapper}>
                  <HomeEventCard event={event} />
                </View>
              ))}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  list: {
    marginBottom: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: screenWidth * 0.75,
    marginRight: 12,
  },
});
