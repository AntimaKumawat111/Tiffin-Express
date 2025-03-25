import MyOrdersScreen from "@/component/MyOrdersScreen";
import { ScrollView, StyleSheet } from "react-native";

export default function Orders() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <MyOrdersScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
