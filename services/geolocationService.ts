import { EventWithCoordinates, SupabaseEventType } from "@/types";

export async function getGeolocation(
  events: SupabaseEventType[] | null
): Promise<EventWithCoordinates[]> {
  if (!events || events.length === 0) {
    return [];
  }

  const coordinatesPromises = events.map(async (event) => {
    const address = encodeURIComponent(
      `${event.street_address} ${event.postal_code} ${event.city}`
    );
  
    try {
      /*
      // Uncomment this if you want to use the real API call
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
  
        return {
          ...event,
          coordinates: {
            longitude: location.lng,
            latitude: location.lat,
          },
        };
      }
      */
  
      // Using dummy data instead of real API response
      const dummyCoordinates = {
        latitude: 60.4501 + Math.random() * 0.01, // Slight variation around Turku
        longitude: 22.2674 + Math.random() * 0.01,
      };
  
      return {
        ...event,
        coordinates: dummyCoordinates,
      };
    } catch (error) {
      console.error(
        `Error fetching geolocation for event ${event.title}:`,
        error
      );
    }

    return null;
  });

  const coordinates = (await Promise.all(coordinatesPromises)).filter(
    (coord): coord is NonNullable<typeof coord> => coord !== null
  );

  return coordinates;
}
