import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import dayjs from "dayjs";
import FeatherIcon from "react-native-vector-icons/Feather";

interface TimePickerProps {
  title: string;
  onChange: (time: string) => void;
  initialTime?: string;
  hideButtons?: boolean; // Hide navigation buttons if needed
}

export default function TimePicker({
  title,
  onChange,
  initialTime,
  hideButtons = false,
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string>(
    initialTime ? initialTime : dayjs().format("HH:mm:ss")
  );
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      const formattedTime = dayjs(time).format("HH:mm:ss");
      setSelectedTime(formattedTime);
      onChange(formattedTime);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timePickerButton}>
          <Text style={styles.timeText}>{selectedTime}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <RNDateTimePicker
            value={dayjs()
              .set("hour", dayjs(selectedTime, "HH:mm:ss").hour())
              .set("minute", dayjs(selectedTime, "HH:mm:ss").minute())
              .toDate()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  timePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  timeText: {
    fontSize: 18,
    color: "#4338ca",
  },
});
