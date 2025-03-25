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
    flexGrow: 1,
    paddingHorizontal:20,
    paddingTop:20
  },
});
