import ChangeAddressScreen from "@/component/ChangeAddressScreen";
import { ScrollView, StyleSheet } from "react-native";

export default function ChangeAddress() {
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
