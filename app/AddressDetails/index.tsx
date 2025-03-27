import AddressDetailsScreen from "@/component/AddressDetailsScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function AddressDetails() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <AddressDetailsScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
