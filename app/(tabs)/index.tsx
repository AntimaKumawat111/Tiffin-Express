import HomeScreen from "@/component/HomeScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HomeScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal:15,
  },
});
