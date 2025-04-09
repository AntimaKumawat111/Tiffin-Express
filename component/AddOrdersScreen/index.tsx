import {
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
} from "@expo-google-fonts/nunito";
import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Button } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper"; // If using react-native-paper

import { Link } from "expo-router";

type CalendarScreenProps = {
  setSelectedDate: (date: string) => void;
  setModalVisible: (visible: boolean) => void;
  submittedDates: Record<string, { selected: boolean; selectedColor: string }>;
};

type ModalVistibleProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedDate: string;
  mealOptions: {
    morning: boolean;
    evening: boolean;
  };
  handleCheckboxChange: (meal: "morning" | "evening") => void;
  handleSubmit: () => void;
  setSubmittedDates: React.Dispatch<
    React.SetStateAction<
      Record<string, { selected: boolean; selectedColor: string }>
    >
  >;
  submittedDates: Record<string, { selected: boolean; selectedColor: string }>;
};

export default function AddOrdersScreen() {
  const today = new Date().toISOString().split("T")[0]; //  Current date
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [submittedDates, setSubmittedDates] = useState<{ [key: string]: any }>(
    {}
  );
  const [mealOptions, setMealOptions] = useState<{
    morning: boolean;
    evening: boolean;
  }>({
    morning: false,
    evening: false,
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isContinueBtnShow, setIsContinueBtnShow] = useState(false);

  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_500Medium_Italic,
  });

  if (!fontLoaded) {
    return null;
  }

  const handleSubmit = () => {
    setSubmittedDates((prev) => ({
      ...prev,
      [selectedDate]: {
        selected: true,
        selectedColor: "#ffbaba",
        dots: [{ color: "red", selectedDotColor: "red" }],
      },
    }));
    setModalVisible(false);
    setIsContinueBtnShow(true);
  };

  const handleCheckboxChange = (meal: "morning" | "evening") => {
    setMealOptions((prev) => ({
      ...prev,
      [meal]: !prev[meal],
    }));
  };

  return (
    <View className="px-5 flex-1" style={{ paddingTop:50,}}>
      {/* Background Shape */}
      <View
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          backgroundColor: "#00C2FF1C",
          zIndex: 0,
          borderBottomRightRadius: 170, // Right side rounded
        }}
      ></View>
      {/* Heading */}
      <View className="flex flex-row items-center justify-between ">
        <Text style={styles.addOrders}>Add Orders</Text>
        <Link
          href="/subscription"
          className="bg-pink-700 px-3 py-3"
          style={{ width: 120, fontFamily: "Nunito_500Medium_Italic" }}
        >
          <Text className="text-white ">Check {"\n"}Subscriptions</Text>
        </Link>
      </View>

      {/* Description */}
      <Text style={styles.desc}>
        Design your day with our meal boxes ! Choose morning, evening, or both
        for a personalized and delicious dining experience.
      </Text>
      <Text
        style={[
          styles.warningText,
          selectedDate === today ? styles.highlightText : {},
        ]}
      >
        {selectedDate === today ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons name="do-not-disturb" size={12} color="red" />
            <Text className="text-red-500">
              Choose a date to customize your meal order.
            </Text>
          </View>
        ) : (
          <Text>Choose a date to customize your meal order.</Text>
        )}
      </Text>
      {/* Calendar */}

      <View style={styles.container}>
        <CalendarScreen
          setSelectedDate={setSelectedDate}
          setModalVisible={setModalVisible}
          submittedDates={submittedDates} // ✅ Pass submitted dates
        />
      </View>
      {selectedDate !== today && (
        <ModalVistible
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDate={selectedDate}
          mealOptions={mealOptions}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          submittedDates={submittedDates}
          setSubmittedDates={setSubmittedDates}
        />
      )}

      {isContinueBtnShow && (
        <Link
          href="./order"
          className="w-full mx-5"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingVertical: 10,
            backgroundColor: "black",
            position: "absolute",
            bottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 26,
              fontFamily: "Nunito_700Bold",
              color: "white",
            }}
          >
            Continue
          </Text>
        </Link>
      )}
    </View>
  );
}

export function CalendarScreen({
  setSelectedDate,
  setModalVisible,
  submittedDates,
}: CalendarScreenProps) {
  return (
    <Calendar
      onDayPress={(day: DateData) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
      }}
      markedDates={submittedDates} // ✅ Show only submitted dates
      theme={{
        todayTextColor: "#FF5736",
        arrowColor: "black",
        textSectionTitleColor: "black",
      }}
    />
  );
}

export function ModalVistible({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSubmittedDates,
  mealOptions,
  handleCheckboxChange,
  handleSubmit,
}: ModalVistibleProps) {
  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 9,
              marginHorizontal: 4,
            }}
          >
            <MaterialIcons name="calendar-month" size={24} color="#00C2FF" />
            <Text style={styles.modalTitle}> Select Meal for </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Nunito_500Medium_Italic",
                color: "#00C2FF",
              }}
            >
              {selectedDate}
            </Text>
          </View>

          {/* Morning Checkbox */}
          <TouchableOpacity
            style={styles.checkboxWrapper}
            onPress={() => handleCheckboxChange("morning")}
            activeOpacity={0.7}
          >
            <Checkbox
              status={mealOptions.morning ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange("morning")}
              color="#00C2FF" // Checked state color
              uncheckedColor="#888" // Unchecked state color
            />
            <Text style={styles.checkboxLabel}>Morning</Text>
          </TouchableOpacity>

          {/* Evening Checkbox */}
          <TouchableOpacity
            style={styles.checkboxWrapper}
            onPress={() => handleCheckboxChange("evening")}
            activeOpacity={0.7}
          >
            <Checkbox
              status={mealOptions.evening ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange("evening")}
              color="#00C2FF" // Checked state color
              uncheckedColor="#888" // Unchecked state color
            />
            <Text style={styles.checkboxLabel}>Evening</Text>
          </TouchableOpacity>

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!mealOptions.morning && !mealOptions.evening}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color:
                    !mealOptions.morning && !mealOptions.evening
                      ? "#e0e0e0"
                      : "#00C2FF",
                  fontFamily: "Nunito_700Bold",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  addOrders: {
    letterSpacing: 0,
    fontWeight: "400",
    fontSize: 40,
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    fontFamily: "YesevaOne_400Regular",
  },

  desc: {
    fontSize: 19,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
    marginBottom: 20,
  },

  calendarWrapper: {
    borderWidth: 1,
    borderColor: "#929AAB",
    borderRadius: 10,
    overflow: "hidden",
  },

  warningText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
  },

  highlightText: {
    color: "red", // ✅ Highlight color
    fontFamily: "Nunito_700Bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },

  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 15,
  },

  cancelButton: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },

  submitButton: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: "#00C2FF",
  },

  disable: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: "gray",
  },
});
