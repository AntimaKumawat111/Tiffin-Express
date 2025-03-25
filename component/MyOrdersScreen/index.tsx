import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";
import { MaterialIcons } from "@expo/vector-icons";

export default function OrdersScreen() {
  const today = new Date().toISOString().split("T")[0]; //  Current date
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View className=" px-5 pt-10">
      {/* Background Shape */}
      <View
        style={{
          position: "absolute",
          width: 250,
          height: 200,
          backgroundColor: "#00C2FF1C",
          zIndex: 0,
          borderBottomRightRadius: 170, // Right side rounded
        }}
      ></View>

      {/* Heading */}
      <Text style={styles.myOrderText}>My {"\n"}Orders</Text>

      {/* Description */}
      <Text style={styles.desc}>
        Explore your upcoming and past orders here. Each date holds a story of
        delicious meals, from freshly delivered delights to cherished favorites.
      </Text>

      {/* Calendar */}
      <View style={styles.container}>
        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#007bff" },
            }}
            theme={{
              selectedDayBackgroundColor: "red",
              todayTextColor: "#FF5736",
              arrowColor: "black",
              textSectionTitleColor: "black",
            }}
          />
        </View>
      </View>

      {/* Conditional Highlighting for Current Date */}
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
              Order cannot be customized for the current day.
            </Text>
          </View>
        ) : (
          <Text> Order cannot be customized for the current day.</Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
  },

  myOrderText: {
    fontSize: 40,
    // marginTop: 40,
    marginBottom: 20,
    // paddingHorizontal: 10,
    fontFamily: "YesevaOne_400Regular",
  },

  desc: {
    fontSize: 19,
    // paddingHorizontal: 10,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
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
    paddingHorizontal: 10,
    textAlign: "center",
    color: "#929AAB", // Default color
    fontFamily: "Nunito_700Bold",
  },

  highlightText: {
    color: "red", // ✅ Highlight color
    fontFamily: "Nunito_700Bold",
  },
});
