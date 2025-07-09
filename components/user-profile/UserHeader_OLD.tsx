import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { UserProfile } from "@/types";

import Button from "@/components/buttons/Button";

type UserHeaderProps = {
  user: UserProfile;
  signOut: () => void;
};

export default function UserSettings({ user, signOut }: UserHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: user.avatar_url,
          }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.first_name} {user.last_name}
          </Text>
          <TouchableOpacity>
            <Text style={styles.addStatus}>+ Add Status</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <MaterialIcons name="person-outline" size={24} color="#666" />
          <Text style={styles.settingText}>Username</Text>
          <Text style={styles.settingValue}>{user.email}</Text>
        </View>
        <View style={styles.settingItem}>
          <MaterialIcons name="email" size={24} color="#666" />
          <Text style={styles.settingText}>Email</Text>
          <Text style={styles.settingValue}>{user.email}</Text>
        </View>
        <View style={styles.settingItem}>
          <Feather name="phone" size={24} color="#666" />
          <Text style={styles.settingText}>Phone</Text>
          <Text style={styles.settingValue}>+358 40 123 4567</Text>
        </View>
        <View style={styles.settingItem}>
          <MaterialIcons name="location-on" size={24} color="#666" />
          <Text style={styles.settingText}>Location</Text>
          <Text style={styles.settingValue}>Helsinki, Finland</Text>
        </View>
      </View>
      <View style={styles.signOutButtonWrapper}>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addStatus: {
    color: "#4a90e2",
    marginTop: 5,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#ececec",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    color: "#666",
    fontWeight: "600",
  },
  settingsList: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  settingValue: {
    fontSize: 16,
    color: "#666",
  },
  signOutButtonWrapper: {
    marginTop: 20,
  },
});
