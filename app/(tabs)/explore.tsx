import React, { useState, useCallback } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Map from "@/components/map/Map";
import MapEventList from "@/components/list/MapEventList";
import { useEvents } from "@/contexts/EventsContext";

export default function ExploreScreen() {
  const { allEventsForCurrentCity } = useEvents();
  const [showList, setShowList] = useState(false);

  // Reset view to map when returning to Explore
  useFocusEffect(
    useCallback(() => {
      setShowList(false); // Always show the map when coming back
    }, [])
  );

  return (
    <View style={styles.screen}>
      {!showList ? (
        <Map events={allEventsForCurrentCity} />
      ) : (
        <MapEventList
          events={allEventsForCurrentCity}
          visible={showList}
          onClose={() => setShowList(false)}
        />
      )}

      {/* Toggle between Map and List */}
      <View style={styles.toggleButton}>
        <Button title={showList ? "Show Map" : "Show List"} onPress={() => setShowList(!showList)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});
