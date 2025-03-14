import { useEffect } from "react";

import { Stack } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider } from "@/contexts/AuthContext";
import { EventsAndDataProvider } from "@/contexts/EventsContext";

import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventsContext";

import { useFonts } from "expo-font";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      throw fontError; // Throw the error so it's caught by ErrorBoundary
    }
  }, [fontError]);

  if (!fontsLoaded) {
    return null; // Keep splash screen until fonts are ready
  }

  return (
    <AuthProvider>
      <EventsAndDataProvider>
        <RootLayoutWithData />
      </EventsAndDataProvider>
    </AuthProvider>
  );
}

function RootLayoutWithData() {
  const { status: authLoadingStatus } = useAuth();

  useEffect(() => {
    async function hideSplashScreen() {
      if (authLoadingStatus !== "fetching") {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [authLoadingStatus]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="meet/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="notifications_modal" options={{ headerShown: false, presentation: "modal" }} /> 
      <Stack.Screen name="login-modal" options={{ headerShown: false, presentation: "modal" }} /> 
    </Stack>
  );
}