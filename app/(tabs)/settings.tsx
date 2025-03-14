import { useState } from "react";

import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  Image,
} from "react-native";

import { useAuth } from "@/contexts/AuthContext";

import FeatherIcon from "@expo/vector-icons/Feather";

const tabs = [
  { name: "Preferences", icon: "settings" },
  { name: "Help", icon: "help-circle" },
];

export default function Example() {
  const [value, setValue] = useState(0);

  const { signOut, userProfile } = useAuth();

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  if (!userProfile) {
    return null; // TODO: add an empty state
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      {userProfile ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>

            <Text style={styles.headerSubtitle}>
              Manage your account settings and preferences
            </Text>
          </View>

          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Image
                alt=""
                source={{
                  uri: userProfile.avatar_url,
                }}
                style={styles.profileAvatar}
              />

              <View>
                <Text style={styles.profileName}>
                  {userProfile.first_name} {userProfile.last_name}
                </Text>

                <Text style={styles.profileHandle}>{userProfile.email}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit-3" size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signOut();
              }}
              style={styles.profileActionLogOut}
            >
              <Text style={[styles.profileActionTextLogOut]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            {tabs.map(({ name, icon }, index) => {
              const isActive = index === value;

              return (
                <View
                  key={name}
                  style={[
                    styles.tabWrapper,
                    isActive && { borderBottomColor: "#6366f1" },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setValue(index);
                    }}
                  >
                    <View style={styles.tab}>
                      <FeatherIcon
                        color={isActive ? "#6366f1" : "#6b7280"}
                        name={icon as keyof typeof FeatherIcon.glyphMap}
                        size={16}
                      />

                      <Text
                        style={[
                          styles.tabText,
                          isActive && { color: "#6366f1" },
                        ]}
                      >
                        {name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            
          </View>
          {value === 1 && (
            <ScrollView>
              <View style={styles.section}>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity
                      onPress={() => {
                        // Handle navigation to "How to Use the App"
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>How to Use the App</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // Handle navigation to FAQ
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>FAQ</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // Handle navigation to asd
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>asd</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>


                </View>
              </View>
            </ScrollView>
          )}



          {value === 0 && (
            <ScrollView>
              <View style={styles.section}>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Language</Text>

                      <View style={styles.rowSpacer} />

                      <Text style={styles.rowValue}>English</Text>

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Location</Text>

                      <View style={styles.rowSpacer} />

                      <Text style={styles.rowValue}>Los Angeles, CA</Text>

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>Email Notifications</Text>

                      <View style={styles.rowSpacer} />

                      <Switch
                        onValueChange={(emailNotifications) =>
                          setForm({ ...form, emailNotifications })
                        }
                        style={{
                          transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                        }}
                        value={form.emailNotifications}
                      />
                    </View>
                  </View>

                  <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>Push Notifications</Text>

                      <View style={styles.rowSpacer} />

                      <Switch
                        onValueChange={(pushNotifications) =>
                          setForm({ ...form, pushNotifications })
                        }
                        style={{
                          transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                        }}
                        value={form.pushNotifications}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resources</Text>

                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Contact Us</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Report Bug</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Rate in App Store</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}
                    >
                      <Text style={styles.rowLabel}>Terms and Privacy</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
            </ScrollView>
          )}
        </View>

      ) : (
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Please log in to view settings</Text>
        </View>

      )}
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  tabs: {
    flexDirection: "row",
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  /** Header */
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    marginTop: 6,
  },
  /** Profile */
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: "#989898",
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 12,
  },
  profileActionLogOut: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(220, 38, 38, 0.7)", // #dc2626 with 50% opacity
    borderWidth: 2, // Define the border thickness
    borderRadius: 12,
    backgroundColor: "transparent", // Make background transparent
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  profileActionTextLogOut: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#dc2626",
  },
  /** Tab */
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingVertical: 10,
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#e5e7eb",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginLeft: 5,
  },
  /** Section */
  section: {
    marginTop: 12,
  },
  sectionBody: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    paddingLeft: 24,
  },
  sectionTitle: {
    marginTop: 0,
    marginHorizontal: 24,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 44,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2c2c2c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#7f7f7f",
    marginRight: 4,
  },

  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
    marginTop: 10,
  },

  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "#a69f9f",
  },
});
