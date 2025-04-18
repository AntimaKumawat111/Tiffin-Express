import NotificationScreen from "@/component/NotificationScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Notification() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <NotificationScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
