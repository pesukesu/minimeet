import React from "react";
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback, 
  Keyboard,
  Modal
} from "react-native";
import { SupabaseEventType } from "@/types"; 
import MapEventListCard from "../cards/MapEventListCard";

type MapEventListProps = {
  events: SupabaseEventType[]; // List of events
  visible: boolean; // Controls modal visibility
  onClose: () => void; // Function to close modal
};

export default function MapEventList({ events, visible, onClose }: MapEventListProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Detect taps outside the list */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Events Near You</Text>

            {/* Event List (prevents modal from closing when interacting inside) */}
            <FlatList
              data={events}
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
});
