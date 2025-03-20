import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// Splash screen ko manually control karne ke liye disable auto-hide

function OtpVerifyScreen() {
  const [number, setNumber] = useState("");

  return (
    <View style={styles.OtpVarify}>
      <Text style={styles.title}>Tiffin Express</Text>
      <Text style={styles.subTitle}>Verify Your Mobile Number</Text>
      <Text style={styles.description}>
        We've sent a 6-digit code to your mobile number. Please enter it below.{" "}
      </Text>

      <TextInput
        value={number}
        placeholder="OTP Code"
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, ""); // Allow only numbers
          setNumber(filteredText);
        }}
        keyboardType="numeric"
        style={styles.inputBox}
      />

      <Link href="./(tabs)" style={styles.link}>
        <Text style={styles.getOtp}>Verify</Text>
      </Link>
    </View>
  );
}

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  OtpVarify: {
    height: "auto",
    width: "auto",
  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginVertical: 40,
  },
  subTitle: {
    width: 300,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "gray",
    lineHeight: 26,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
  },

  link: {
    backgroundColor: "black",
    padding: 10, // Reduced padding
    width: 180, // Set a smaller width
    alignSelf: "center", // Center the button
    borderRadius: 3,
    // marginVertical: 20,
  },

  getOtp: {
    textAlign: "center",
    color: "white",
    fontSize: 20, // Reduced font size
    fontWeight: "bold",
  },
});
