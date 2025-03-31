import ChangeAddressScreen from "@/component/ChangeAddressScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Delivery() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ChangeAddressScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
