import Login from "@/app-example/components/Login";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Login />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 50,
    flexGrow: 1,
    alignItems: "center", // Center content horizontally & vertically
  },
});
