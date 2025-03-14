import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface CreateEventFormStepProps {
  backButtonPress: () => void;
  buttonPress: () => void;
  stepTitle: string;
  buttonText: string;
  formInputs: { label: string; inputProps?: TextInputProps; customInput?: React.ReactElement }[];
  eventSummary: React.ReactElement; // added to get rid of error lol
}

export default function Example({
  backButtonPress,
  buttonPress,
  stepTitle,
  buttonText,
  formInputs,
}: CreateEventFormStepProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.header}>
        <View style={styles.headerAction}>
          <TouchableOpacity onPress={backButtonPress}>
            <FeatherIcon color="#000" name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={styles.headerTitle}>
          {stepTitle}
        </Text>

        <View style={[styles.headerAction, { alignItems: "flex-end" }]} />
      </View>

      <KeyboardAwareScrollView style={styles.content}>
      {formInputs.map((input, index) => (
  <View style={styles.section} key={index}>
    <Text style={styles.sectionTitle}>{input.label}</Text>
    <View style={styles.sectionBody}>
      {input.customInput ? (
        input.customInput
      ) : (
        <TextInput
          clearButtonMode="while-editing"
          onChangeText={input.inputProps?.onChangeText} // 🛠 Add safety check (?)
          placeholder={input.inputProps?.placeholder}
          style={[
            styles.sectionInput,
            input.inputProps?.multiline ? { height: 150, textAlignVertical: "top", paddingTop: 12 } : {},
          ]}
          value={input.inputProps?.value}
          multiline={input.inputProps?.multiline || false} // 🛠 Add default `false`
          numberOfLines={input.inputProps?.multiline ? 4 : 1} // 🛠 Prevent `undefined`
        />
      )}
    </View>
  </View>
))}

        <TouchableOpacity
          onPress={() => {
            buttonPress();
          }}
        >
          <View style={styles.btn}>
            <View style={{ width: 34 }} />

            <Text style={styles.btnText}>{buttonText}</Text>

            <MaterialCommunityIcons
              color="#fff"
              name="arrow-right"
              size={22}
              style={{ marginLeft: 12 }}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionInput: {
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 17,
    fontWeight: "500",
    color: "#1d1d1d",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#000",
    borderColor: "#000",
    marginVertical: 24,
    marginHorizontal: 36,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
