import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TextInput, // ✅ Import for filter input
} from "react-native";
import { SupabaseEventType } from "@/types";
import MapEventListCard from "../cards/MapEventListCard";

type MapEventListProps = {
  events: SupabaseEventType[]; // List of events
  visible: boolean; // Controls modal visibility
  onClose: () => void; // Function to close modal
};

export default function MapEventList({ events, visible, onClose }: MapEventListProps) {
  // ✅ State to hold the city filter input
  const [cityFilter, setCityFilter] = useState("");

  // ✅ Filter events based on the city input (case-insensitive match)
  const filteredEvents = cityFilter
    ? events.filter((event) =>
        event.city?.toLowerCase().includes(cityFilter) // ✅ Compare lowercase to lowercase
      )
    : events;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Detect taps outside the list */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Events Near You2</Text>

            {/* ✅ Input to filter events by city */}
            <TextInput
              style={styles.input}
              placeholder="Filter by city..."
              value={cityFilter}
              onChangeText={(text) => setCityFilter(text.toLowerCase())} // ✅ Always store lowercase
            />

            {/* Event List (prevents modal from closing when interacting inside) */}
            <FlatList
              data={filteredEvents} // ✅ Use the filtered list
              keyExtractor={(event) => event.id.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                  <View>
                    <MapEventListCard event={item} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  // ✅ Style for the city filter input
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
