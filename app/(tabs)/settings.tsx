import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
  Switch,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import FeatherIcon from "@expo/vector-icons/Feather";
import { UserProfile } from "@/types";

export default function SettingsScreen() {
  const { signOut, userProfile, updateUserProfile } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Temporary state for editing
  const [tempProfile, setTempProfile] = useState<Partial<UserProfile>>({
    first_name: "",
    last_name: "",
    avatar_url: "",
    user_profile_description: "",
    company_name: "",
    job_title: "",
    hometown: "",
  });

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize temporary profile when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setTempProfile({
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        avatar_url: userProfile.avatar_url || "",
        user_profile_description: userProfile.user_profile_description || "",
        company_name: userProfile.company_name || "",
        job_title: userProfile.job_title || "",
        hometown: userProfile.hometown || "",
      });
      setIsLoading(false);
    } else {
      setError("No user profile found");
      setIsLoading(false);
    }
  }, [userProfile]);


  const handleUpdateProfile = async () => {
    // Prevent multiple simultaneous updates
    if (loading) return;
  
    setLoading(true);
  
    try {
      // Ensure user_id is available (user_id should be provided by useAuth context)
      if (!userProfile?.user_id) {
        throw new Error("User ID is missing. Cannot update profile.");
      }
  
      // Construct the updated profile object
      const updatedProfile: Partial<UserProfile> = {
        first_name: tempProfile.first_name || userProfile.first_name,
        last_name: tempProfile.last_name || userProfile.last_name,
        avatar_url: tempProfile.avatar_url || userProfile.avatar_url,
        user_profile_description: tempProfile.user_profile_description || userProfile.user_profile_description,
        company_name: tempProfile.company_name || userProfile.company_name,
        job_title: tempProfile.job_title || userProfile.job_title,
        hometown: tempProfile.hometown || userProfile.hometown,
      };
  
      // Update the profile
      await updateUserProfile(updatedProfile);
  
      // Close editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert(
        "Update Failed",
        "Could not update profile. Please try again.",
        [{ text: "OK", onPress: () => {} }]
      );
    } finally {
      setLoading(false);
    }
  };
  





  // Render loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading Profile...</Text>
      </SafeAreaView>
    );
  }

  // Render error state
  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={signOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Image 
                alt="Profile" 
                source={{ uri: tempProfile.avatar_url || 'https://rnofijizfghsdoyrcnlo.supabase.co/storage/v1/object/public/User%20Profile%20Images//a2.png' }} 
                style={styles.profileAvatar} 
                onError={(e) => console.log('Image load error', e.nativeEvent.error)}
              />
              <View>
                <Text style={styles.profileName}>
                  {tempProfile.first_name} {tempProfile.last_name}
                </Text>
                <Text style={styles.profileHandle}>{tempProfile.company_name}</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => setIsEditing(true)} 
              disabled={loading}
            >
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>
                <FeatherIcon color="#fff" name="edit-3" size={16} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={signOut} style={styles.profileActionLogOut}>
              <Text style={styles.profileActionTextLogOut}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Profile Edit Modal */}
      <Modal 
        visible={isEditing} 
        transparent 
        animationType="slide"
        onRequestClose={() => setIsEditing(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalBackground}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalScrollView}
            >
              <TextInput 
                style={styles.input} 
                placeholder="First Name" 
                value={tempProfile.first_name || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, first_name: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Last Name" 
                value={tempProfile.last_name || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, last_name: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Avatar URL" 
                value={tempProfile.avatar_url || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, avatar_url: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Profile Description" 
                value={tempProfile.user_profile_description || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, user_profile_description: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Company Name" 
                value={tempProfile.company_name || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, company_name: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Job Title" 
                value={tempProfile.job_title || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, job_title: text }))} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Hometown" 
                value={tempProfile.hometown || ""} 
                onChangeText={(text) => setTempProfile(prev => ({ ...prev, hometown: text }))} 
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  onPress={() => setIsEditing(false)} 
                  disabled={loading}
                >
                  <Text style={styles.modalCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleUpdateProfile} 
                  disabled={loading}
                >
                  <View style={styles.modalSave}>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.modalSaveText}>Save</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
  container: { paddingVertical: 24, flex: 1 },
  header: { paddingHorizontal: 24, marginBottom: 12 },
  headerTitle: { fontSize: 32, fontWeight: "700" },
  profile: { padding: 24, backgroundColor: "#fff", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e3e3e3" },
  profileHeader: { flexDirection: "row", alignItems: "center" },
  profileAvatar: { width: 60, height: 60, borderRadius: 9999, marginRight: 12 },
  profileName: { fontSize: 17, fontWeight: "600" },
  profileHandle: { fontSize: 15, color: "#989898" },
  profileAction: { 
    marginTop: 16, 
    paddingVertical: 10, 
    backgroundColor: "#000", 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  profileActionText: { color: "#fff", fontWeight: "600" },
  profileActionLogOut: { 
    marginTop: 16, 
    paddingVertical: 10, 
    borderColor: "#dc2626", 
    borderWidth: 2, 
    borderRadius: 12, 
    alignItems: "center" 
  },
  profileActionTextLogOut: { color: "#dc2626", fontWeight: "600" },
  modalBackground: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContainer: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    width: "90%", 
    maxHeight: "80%" 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  modalScrollView: {
    flexGrow: 1,
  },
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 15, 
    padding: 10 
  },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 20 
  },
  modalCancel: { 
    color: "#dc2626", 
    fontSize: 16 
  },
  modalSave: { 
    backgroundColor: "#6366f1", 
    padding: 10, 
    borderRadius: 5 
  },
  modalSaveText: { 
    color: "#fff", 
    fontSize: 16 
  },
});