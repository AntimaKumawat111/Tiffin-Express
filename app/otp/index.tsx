import OtpVarify from "@/app-example/components/Otp";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function Otp() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <OtpVarify />
    </ScrollView>
  );
}

export default Otp;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 50,
    flexGrow: 1,
    alignItems: "center", // Center content horizontally & vertically
  },
});
