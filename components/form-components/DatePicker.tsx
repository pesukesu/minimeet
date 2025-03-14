import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";

import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";

interface DatePickerProps {
  title: string;
  buttonText: string;
  backButtonPress: () => void;
  buttonPress: () => void;
  onChange: (date: string) => void;
  initialDate?: string | { date: string };
}

export default function DatePicker({
  title,
  buttonText,
  backButtonPress,
  buttonPress,
  onChange,
  initialDate,
}: DatePickerProps) {
  // Initialize state with today's date
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  // Debug selectedDate changes
  useEffect(() => {
    console.log("selectedDate state updated:", selectedDate);
  }, [selectedDate]);

  // Parse the initial date correctly
  useEffect(() => {
    let dateValue = "";
    
    // Handle different formats of initialDate
    if (initialDate) {
      try {
        // Case 1: initialDate is an object with a date property ({"date": "2025-03-09T00:00:00.000Z"})
        if (typeof initialDate === 'object' && initialDate !== null && 'date' in initialDate) {
          const dateObj = initialDate as { date: string };
          dateValue = dateObj.date;
        } 
        // Case 2: initialDate is a string
        else if (typeof initialDate === 'string') {
          dateValue = initialDate;
        }
        
        // Parse the date if it's not empty
        if (dateValue && dateValue.trim() !== "") {
          // Parse ISO string to YYYY-MM-DD format
          const parsedDate = dayjs(dateValue).format("YYYY-MM-DD");
          if (dayjs(parsedDate).isValid()) {
            setSelectedDate(parsedDate);
          }
        }
      } catch (error) {
        console.log("Error parsing initial date:", error);
      }
    }
  }, [initialDate]);

  // Handle date changes from the picker - completely rewritten
  const handleDateChange = (value: any) => {
    console.log("DatePicker onChange value:", value);
    
    try {
      // Different DateTimePicker libraries return different formats
      // Let's handle various possibilities
      
      // For react-native-ui-datepicker specifically
      if (value && typeof value === 'object' && 'date' in value) {
        const dateObj = value.date;
        const formattedDate = dayjs(dateObj).format("YYYY-MM-DD");
        console.log("Setting date from date property:", formattedDate);
        setSelectedDate(formattedDate);
        onChange(dayjs(dateObj).toISOString());
        return;
      }
      
      // For other common formats
      let dateToUse = null;
      
      if (value === null || value === undefined) {
        console.log("Null or undefined value received");
        return; // Don't update if null
      }
      
      if (value instanceof Date) {
        dateToUse = value;
      } else if (typeof value === 'string') {
        dateToUse = new Date(value);
      } else if (typeof value === 'object') {
        // Try different common properties
        if ('dateString' in value) {
          dateToUse = new Date(value.dateString);
        } else if ('timestamp' in value) {
          dateToUse = new Date(value.timestamp);
        } else if ('toDate' in value && typeof value.toDate === 'function') {
          // Handle dayjs objects
          dateToUse = value.toDate();
        } else {
          // Last resort - try to convert the whole object
          dateToUse = new Date(value);
        }
      }
      
      if (dateToUse && !isNaN(dateToUse.getTime())) {
        const formattedDate = dayjs(dateToUse).format("YYYY-MM-DD");
        console.log("Setting formatted date:", formattedDate);
        setSelectedDate(formattedDate);
        onChange(dayjs(dateToUse).toISOString());
      } else {
        console.log("Could not parse date from:", value);
      }
    } catch (error) {
      console.log("Error in handleDateChange:", error);
    }
  };

  // For debugging: log what date we're actually passing to the DateTimePicker
  const datePassedToPicker = dayjs(selectedDate).isValid() 
    ? dayjs(selectedDate).toDate() 
    : dayjs().toDate();
  
  console.log("Date passed to picker:", datePassedToPicker);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.header}>
        <View style={styles.headerAction}>
          <TouchableOpacity
            onPress={backButtonPress}
          >
            <FeatherIcon color="#000" name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>

        <View style={[styles.headerAction, { alignItems: "flex-end" }]} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>

          <View style={styles.sectionBody}>
            <DateTimePicker
              mode="single"
              date={datePassedToPicker}
              minDate={dayjs().toDate()}
              onChange={handleDateChange}
              selectedItemColor="#4338ca"
            />
          </View>
        </View>

        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateLabel}>Selected Date:</Text>
          <Text style={styles.selectedDateValue}>
            {dayjs(selectedDate).format("MMMM D, YYYY")}
          </Text>
          <Text style={styles.selectedDateDebug}>
            Raw value: {selectedDate}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            // Make sure a date is selected before proceeding
            if (!selectedDate || selectedDate.trim() === "") {
              // If somehow we don't have a date, set today's date in ISO format
              const today = dayjs().toISOString();
              onChange(today);
            } else {
              // Ensure the date is in ISO format when proceeding
              const isoString = dayjs(selectedDate).toISOString();
              onChange(isoString);
            }
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
      </View>
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
    marginVertical: 10,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Selected Date Display */
  selectedDateContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  selectedDateLabel: {
    fontSize: 14,
    color: "#a69f9f",
    marginBottom: 4,
  },
  selectedDateValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4338ca",
  },
  selectedDateDebug: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
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