import { View, StyleSheet } from "react-native";
import { useEvents } from "@/contexts/EventsContext";

import FilterItem from "../FilterItem";

export default function FilterCarousel() {
  const { eventCategories } = useEvents();

  return (
    <View style={styles.filterContainer}>
      {eventCategories.map((eventCategory) => (
        <FilterItem key={eventCategory.id} eventCategory={eventCategory} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    width: "100%",
    marginTop: 30,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
