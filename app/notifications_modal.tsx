import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Notifications</Text>
      <Text>No new notifications yet.</Text>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, padding: 10, backgroundColor: "#007AFF", borderRadius: 5 }}>
        <Text style={{ color: "white" }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
