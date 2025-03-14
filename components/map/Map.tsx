import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import { getGeolocation } from "@/services/geolocationService";
import { lightBlueMapStyle } from "@/config/mapStyles";

import { EventWithCoordinates, SupabaseEventType } from "@/types";

import HomeEventCard from "../cards/HomeEventCard";

const INITIAL_POSITION = {
  latitude: 60.4518,
  longitude: 22.2666,
  latitudeDelta: 0.02,
  longitudeDelta: 0.01,
};

type MapProps = {
  events: SupabaseEventType[];
};

export default function Map({ events }: MapProps) {
  const navigation = useNavigation();
  const [coordinates, setCoordinates] = useState<EventWithCoordinates[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventWithCoordinates | null>(null);

  useEffect(() => {
    async function fetchCoordinates() {
      const result = await getGeolocation(events);
      setCoordinates(result);
    }

    fetchCoordinates();
  }, [events]);

  return (
    <View style={{ flex: 1 }}>
    <MapView
      style={styles.map}
      initialRegion={INITIAL_POSITION}
      customMapStyle={lightBlueMapStyle}
      showsUserLocation
      showsMyLocationButton
      onPress={() => setSelectedEvent(null)} // Click anywhere on map to close popup
    >
      {coordinates.map((event) => (
        <Marker
          key={event.id}
          coordinate={event.coordinates}
          onPress={() => setSelectedEvent(event)} // Open event when marker is clicked
        >
        </Marker>
      ))}
    </MapView>

      {selectedEvent && (
        <View style={styles.eventDetails}>
          <HomeEventCard event={selectedEvent} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  eventDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
});
