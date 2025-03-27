import { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../../contexts/AuthContext"; // Keep the same auth context
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const { userProfile, updateUserProfile } = useAuth(); // Use existing auth context
  const navigation = useNavigation();

  const [first_name, setFirst_name] = useState(userProfile?.first_name || "");
  const [last_name, setLast_name] = useState(userProfile?.last_name || "");
  const [avatar_url, setAvatar_url] = useState(userProfile?.avatar_url || "");
  const [user_profile_description, setuser_profile_description] = useState(userProfile?.user_profile_description || "");
  const [company_name, setCompany_name] = useState(userProfile?.company_name || "");
  const [job_title, setJob_title] = useState(userProfile?.job_title || "");
  const [hometown, setHometown] = useState(userProfile?.hometown || "");
  
  
  
  
  

  useEffect(() => {
    if (userProfile) {
      setFirst_name(userProfile?.first_name || "");
      setLast_name(userProfile?.last_name || "");
      setAvatar_url(userProfile?.avatar_url || "");
      setuser_profile_description(userProfile?.user_profile_description || "");
      setCompany_name(userProfile?.company_name || "");
      setJob_title(userProfile?.job_title || "");
      setHometown(userProfile?.hometown || "");
    }
  }, [userProfile]);

  const handleSave = async () => {
    await updateUserProfile({ first_name, last_name, avatar_url, user_profile_description, company_name, job_title, hometown }); // Use the same update function from useAuth
    navigation.goBack(); // Go back to settings screen
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Edit Profile</Text>
      <TextInput
        value={first_name}
        onChangeText={setFirst_name}
        placeholder="Name"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={last_name}
        onChangeText={setLast_name}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
            <TextInput
        value={avatar_url}
        onChangeText={setAvatar_url}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
            <TextInput
        value={user_profile_description}
        onChangeText={setuser_profile_description}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
            <TextInput
        value={company_name}
        onChangeText={setCompany_name}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
            <TextInput
        value={job_title}
        onChangeText={setJob_title}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
            <TextInput
        value={hometown}
        onChangeText={setHometown}
        placeholder="Email"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

export default EditProfile;
