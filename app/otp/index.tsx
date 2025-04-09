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
    flex: 1,
   
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
