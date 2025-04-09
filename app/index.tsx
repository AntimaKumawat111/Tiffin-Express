import "react-native-get-random-values";
import { StatusBar } from "react-native"; // Import from react-native instead
import LoginScreen from "@/component/LoginScreen";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" // or "dark-content"
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: StatusBar.currentHeight || 20 },
        ]}
      >
        <LoginScreen />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth:3,
    // borderColor:'red',
    flex: 1,
    // paddingTop: 50,

  },
  scrollContainer: {
    // flexGrow: 1,
    paddingHorizontal: 20,
  },
});
