import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import FeatherIcon from "@expo/vector-icons/Feather";

import { UserProfile } from "@/types";

type HomeScreenLayoutProps = {
  userProfile: UserProfile | null;
  children: React.ReactNode;
};

export default function HomeScreenLayout({
  userProfile,
  children,
}: HomeScreenLayoutProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/settings")}>            
            {userProfile ? (
              <Image
                source={{ uri: userProfile.avatar_url }}
                style={styles.avatar}
              />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/notifications_modal")}>
            <FeatherIcon name="bell" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>
            {userProfile
              ? `Hello, ${userProfile.first_name}!`
              : "Login or sign up to get started"}
          </Text> 
          <Text style={styles.greetingText}>
            There's N events near you today
          </Text>
          
          {!userProfile && (
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginButtonText}>
                Log in / Sign up
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.search}>              
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9695b0"
            style={styles.searchInput}
          />
          <View style={styles.searchFloating}>
            <TouchableOpacity>
              <View style={styles.searchButton}>
                <FeatherIcon
                  name="search"
                  size={20}
                  color={Colors.background}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>           
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Events near you</Text>
          <TouchableOpacity onPress={() => router.push("/explore")}>            
            <Text style={styles.contentLink}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.contentPlaceholder}>{children}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  /** Greeting */
  greeting: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    marginBottom: 12,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginTop: 8,
  },
  /** Search */
  search: {
    position: "relative",
  },
  searchInput: {
    height: 56,
    backgroundColor: "#f3f3f6",
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 18,
    borderRadius: 9999,
  },
  searchFloating: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  searchButton: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: Colors.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  /** Content */
  content: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  contentLink: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  contentPlaceholder: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
