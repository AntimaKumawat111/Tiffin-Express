
import LoginScreen from "@/component/LoginScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LoginScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // marginTop: 50,
    flexGrow: 1,
    alignItems: "center", 
  },
});