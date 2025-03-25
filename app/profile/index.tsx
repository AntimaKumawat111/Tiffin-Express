import ProfileScreen from "@/component/ProfileScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 15,
  },
});
