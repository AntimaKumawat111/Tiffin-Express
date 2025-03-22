import SubscriptionScreen from "@/component/SubscriptionScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Subscription() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SubscriptionScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
