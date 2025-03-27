import DeliveryScreen from "@/component/DeliveryScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Delivery() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DeliveryScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // alignItems: "center",
  },
});
