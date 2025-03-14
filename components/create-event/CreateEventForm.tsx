import { useState } from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEvents } from "@/contexts/EventsContext";
import { useForm, useWatch } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import CreateEventStarterScreen from "../screens/CreateEventStarterScreen";
import CreateEventFormStep from "./CreateEventFormStep";
import DatePicker from "../form-components/DatePicker";
import TimePicker from "../form-components/TimePicker";
import { SupabaseEventType } from "@/types";

export default function CreateEventForm() {
  const { control, handleSubmit, reset, setValue } =
    useForm<SupabaseEventType>();
  const { createNewEvent, eventCategories } = useEvents();
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();

  const formData = useWatch({
    control,
    defaultValue: {
      title: "",
      date_of_event: "",
      time_of_event: "",
      end_time_of_event: "",
      number_of_attendees: 0,
      street_address: "",
      postal_code: "",
      city: "",
      category: "",
      description: "",
      image: "",
    },
  });

  const getCategoryImage = (category: string): string => {
    const selectedCategory = eventCategories.find(
      (c) => c.title.toLowerCase() === category.toLowerCase()
    );
    return selectedCategory ? selectedCategory.image : "https://rnofijizfghsdoyrcnlo.supabase.co/storage/v1/object/public/Event%20Images//defaultEvent.png";
  };

  const handleNextStep = () => {
    if (currentStep === 4) {
      const categoryImage = getCategoryImage(formData.category || "");
      setValue("image", categoryImage);
    }
    setCurrentStep((current) => current + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((current) => current - 1);
  };

  const handleSubmitEvent = (data: SupabaseEventType) => {
    data.image = getCategoryImage(data.category);
    createNewEvent(data);
    reset();
    setCurrentStep(0);
    router.push("/explore");
  };

  return (
    <>
      {currentStep === 0 && <CreateEventStarterScreen onStartClick={handleNextStep} />}
      {currentStep === 1 && (
        <CreateEventFormStep
          backButtonPress={() => {
            handlePreviousStep();
            reset();
          }}
          buttonPress={handleNextStep}
          stepTitle="Minimeet details"
          buttonText="Next"
          formInputs={[
            {
              label: "Event Title",
              inputProps: {
                placeholder: "Enter event title",
                value: formData.title,
                onChangeText: (text) => setValue("title", text),
                autoCapitalize: "words",
                autoComplete: "off",
                multiline: false,
              },
            },
            {
              label: "Description",
              inputProps: {
                placeholder: "Enter event description",
                multiline: true,
                value: formData.description,
                onChangeText: (text) => setValue("description", text),
                autoCapitalize: "words",
                autoComplete: "off",
              },
            },
          ]}
          eventSummary={<Text>Event Summary</Text>}
        />
      )}
      {currentStep === 2 && (
        <DatePicker
          title={"Select date"}
          buttonText={"Next"}
          backButtonPress={handlePreviousStep}
          buttonPress={handleNextStep}
          onChange={(date) => setValue("date_of_event", date)}
        />
      )}
      {currentStep === 3 && (
        <CreateEventFormStep
          backButtonPress={handlePreviousStep}
          buttonPress={handleNextStep}
          stepTitle="Select time"
          buttonText="Next"
          formInputs={[
            {
              label: "Start Time",
              customInput: (
                <TimePicker title="Select starting time" onChange={(time) => setValue("time_of_event", time)} />
              ),
            },
            {
              label: "End Time",
              customInput: (
                <TimePicker title="Select ending time" onChange={(time) => setValue("end_time_of_event", time)} />
              ),
            },
          ]}
          eventSummary={<Text>Event Summary</Text>}
        />
      )}
      {currentStep === 4 && (
        <CreateEventFormStep
          backButtonPress={handlePreviousStep}
          buttonPress={handleNextStep}
          stepTitle="Location details"
          buttonText="Next"
          formInputs={[
            { label: "Street address", inputProps: { placeholder: "Enter street address", value: formData.street_address, onChangeText: (text) => setValue("street_address", text) } },
            { label: "Postal code", inputProps: { placeholder: "Enter postal code", value: formData.postal_code, onChangeText: (text) => setValue("postal_code", text) } },
            { label: "City", inputProps: { placeholder: "Enter city", value: formData.city, onChangeText: (text) => setValue("city", text) } },
          ]}
          eventSummary={<Text>Event Summary</Text>}
        />
      )}
      {currentStep === 5 && (
        <CreateEventFormStep
          backButtonPress={handlePreviousStep}
          buttonPress={handleNextStep}
          stepTitle="Event details"
          buttonText="Next"
          formInputs={[
            {
              label: "Category",
              customInput: (
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) => setValue("category", value)}
                  style={{ height: 50, width: "100%", backgroundColor: "#fff", borderRadius: 12 }}
                >
                  <Picker.Item label="Select event category" value="" />
                  {eventCategories.map(({ id, title }) => (
                    <Picker.Item key={id} label={title} value={title} />
                  ))}
                </Picker>
              ),
            },
            {
              label: "Max. number of people",
              inputProps: {
                placeholder: "Max. number of people",
                value: formData.number_of_attendees?.toString() || "",
                onChangeText: (text) => setValue("number_of_attendees", parseInt(text)),
                keyboardType: "numeric",
              },
            },
          ]}
          eventSummary={<Text>Event Summary</Text>}
        />
      )}
      {currentStep === 6 && (
        <CreateEventFormStep
          backButtonPress={handlePreviousStep}
          buttonPress={handleSubmit(handleSubmitEvent)}
          stepTitle="Review & Submit"
          buttonText="Create Event"
          formInputs={[]}
          eventSummary={
            <View style={{ gap: 8 }}>
              <Text>Event Summary</Text>
              <Text>Title: {formData.title}</Text>
              <Text>Description: {formData.description}</Text>
              <Text>Date: {formData.date_of_event}</Text>
              <Text>Time: {formData.time_of_event}</Text>
              <Text>Time: {formData.end_time_of_event}</Text>
              <Text>Location: {formData.street_address}</Text>
              <Text>City: {formData.city}</Text>
              <Text>Postal Code: {formData.postal_code}</Text>
              <Text>Category: {formData.category}</Text>
              <Text>Max Attendees: {formData.number_of_attendees}</Text>
              
              <Text style={{ marginTop: 10, fontWeight: '600' }}>Event Image:</Text>
              <Image 
                source={{ uri: getCategoryImage(formData.category || "") }} 
                style={{ width: 200, height: 150, borderRadius: 8, marginTop: 5 }} 
              />
            </View>
          }
        />
      )}
    </>
  );
}
