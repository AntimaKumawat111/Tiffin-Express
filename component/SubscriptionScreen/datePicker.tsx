import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

function DatePicker({
  onDateChange,
}: {
  onDateChange: (days: number) => void;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);
  const [dayDifference, setDayDifference] = useState(0);

  const calculateDays = (start: Date, end?: Date) => {
    if (!end) return 0;
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const days = calculateDays(startDate, endDate);
    setDayDifference(days);
    onDateChange(days);
  }, [startDate, endDate]);

  const onStartChange = (event: any, selectedDate?: Date) => {
    setShowPicker(null);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (endDate && selectedDate >= endDate) {
        setEndDate(undefined);
      }
    }
  };

  const onEndChange = (event: any, selectedDate?: Date) => {
    setShowPicker(null);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const getNextDay = (date: Date) => {
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker("start")}
        style={styles.row}
      >
        <Text style={styles.label}>Start</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            value={
              startDate.toDateString() === new Date().toDateString()
                ? "Today"
                : startDate.toDateString()
            }
            editable={false}
            pointerEvents="none"
            style={styles.input}
            underlineColor="transparent"
          />
          <MaterialIcons name="calendar-month" size={24} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowPicker("end")} style={styles.row}>
        <Text style={styles.label}>End</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            value={endDate ? endDate.toDateString() : ""}
            editable={false}
            pointerEvents="none"
            style={styles.input}
            underlineColor="transparent"
          />
          <MaterialIcons name="calendar-month" size={24} />
        </View>
      </TouchableOpacity>

      {showPicker === "start" && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onStartChange}
        />
      )}

      {showPicker === "end" && (
        <DateTimePicker
          value={endDate || getNextDay(startDate)}
          mode="date"
          display="default"
          minimumDate={getNextDay(startDate)}
          onChange={onEndChange}
        />
      )}

      <Text style={styles.infoText}>Days Difference: {dayDifference}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFD600",
  },
  label: {
    fontSize: 19,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "transparent",
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DatePicker;
