import OtpVerifyScreen from "@/component/OtpScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Otp() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <OtpVerifyScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 50,
    flexGrow: 1,
    alignItems: "center",
  },
});
