import AddOrderScreen from "@/component/AddOrdersScreen";
import { ScrollView, StyleSheet } from "react-native";

export default function AddOrder() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <AddOrderScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // alignItems: "center",
  },
});
