import OrdersScreen from "@/component/OrdersScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Orders() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <OrdersScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
});
