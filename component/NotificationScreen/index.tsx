import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_300Light } from "@expo-google-fonts/nunito";

export default function NotificationScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Congratulations! Your order has been successfully booked.",
      time: "11.30 PM",
    },
    {
      id: 2,
      type: "error",
      message: "Your booking for 15 Sept 2023 has been canceled.",
      time: "11.30 PM",
    },
  ]);

  // Function to format time dynamically
  const formatTime = (date: Date): string =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]); // Clearing the notifications array
    setModalVisible(false); // Closing the modal
  };

  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_300Light,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View className="flex-1 px-5 pt-10">
      <View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          backgroundColor: "#9E00FF1C",
          zIndex: 0,
          right: 0,
          borderBottomLeftRadius: 170,
        }}
      ></View>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.desc}>
        A place to see your activity and order booking notifications.
      </Text>

      <View style={styles.todayContainer}>
        <Text style={styles.today}>Today</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal for Clearing Notifications */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.cleartitle}>Clear all notifications?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to clear all notifications?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearNotifications}>
                <Text style={styles.buttonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <View key={notification.id} style={styles.container}>
            <View
              style={{
                backgroundColor:
                  notification.type === "success"
                    ? "rgba(0, 255, 0, 0.2)" // Green with 20% opacity
                    : "rgba(255, 0, 0, 0.2)", // Red with 20% opacity
                borderRadius: 50, // Circular background
                padding: 10, // Space around icon
              }}
            >
              <Ionicons
                name={
                  notification.type === "success"
                    ? "checkmark-outline"
                    : "close"
                }
                size={30}
                color={notification.type === "success" ? "green" : "red"}
              />
            </View>

            <Text style={styles.message}>{notification.message}</Text>
            <Text style={styles.time}>{notification.time}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noMessage}>No messages available here</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontFamily: "YesevaOne_400Regular",
  },

  desc: {
    fontSize: 19,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
  },

  todayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  today: {
    fontWeight: "500",
    fontSize: 23,
    fontFamily: "Nunito_700Bold",
  },

  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  message: {
    fontWeight: "500",
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
    color: "black",
    fontFamily: "Nunito_700Bold",
  },

  time: {},

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
  cleartitle: {
    fontSize: 20,
    marginBottom: 10,
    textTransform: "capitalize",
    fontFamily: "Nunito_700Bold",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    fontFamily: "Nunito_300Light",
  },
  modalButtons: {
    width: "auto",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 20,
  },
  noMessage: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#929AAB",
    marginTop: 20,
  },
});
