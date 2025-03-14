import React from "react";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";

import { router } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/contexts/AuthContext";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const { session } = useAuth();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          tabBarInactiveTintColor: Colors.tabIconDefault,
          headerShown: useClientOnlyValue(false, false),

          tabBarItemStyle: {
            height: 60,
            paddingVertical: 8,
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarShowLabel: false,
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            title: "Welcome",
            tabBarIcon: ({ color }) => <TabBarIcon name="feed" color={color} />,
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="search" color={color} />
            ),
          }}
        />

          <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: () => (
              <View style={styles.createIconContainer}>
                <TabBarIcon name="magic" color={Colors.background} />
              </View>
            ),
          }}




           listeners={{
             tabPress: (e) => {
               if (!session) {
                 e.preventDefault();
                 router.push("/login-modal");
               }
             },
           }}
        />
        <Tabs.Screen
          name="my-meets"
          options={{
            headerTitle: "My meets",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  createIconContainer: {
    backgroundColor: Colors.tint,
    borderRadius: Colors.borderRadius,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
