import { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Image,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/types";

type CreatorOverviewProps = {
  creatorID: string;
};

export default function CreatorOverview({ creatorID }: CreatorOverviewProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { getSingleUserProfile } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getSingleUserProfile(creatorID);
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return null; // TODO: add an empty state
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={{
                  uri: userProfile.avatar_url,
                }}
                style={styles.avatarImg}
              />
              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>
                {userProfile.first_name} {userProfile.last_name}
              </Text>
              <Text style={styles.profileSubtitle}>
                {userProfile.job_title ?? "No job title"} {" · "}
                <Text style={{ color: "#266EF1" }}>
                  {userProfile.company_name ?? "No company"}
                </Text>
              </Text>
              {/* Display hometown if available */}
              {userProfile.hometown && (
                <Text style={styles.profileHometown}>
                  📍 {userProfile.hometown}
                </Text>
              )}
            </View>
          </View>

          {/* Updated this line to fetch actual description */}
          <Text style={styles.profileDescription}>
            {userProfile.user_profile_description ?? "No description available."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    backgroundColor: "transparent",
    padding: 24,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
  profileHometown: {
    fontSize: 14,
    fontWeight: "500",
    color: "#266EF1",
    marginTop: 4,
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#778599",
  },
  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
});
