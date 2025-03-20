// // import Login from "@/my-expo-app/components/Login";

// import LoginScreen from "@/my-expo-app/components/LoginScreen";
// import TempScreen from "@/my-expo-app/components/tempScreen";
// import Temp from "@/my-expo-app/components/tempscreen";
// import LoginScreen from "@/component/LoginScreen";
// import { Link } from "expo-router";
// import { ScrollView, StyleSheet, Text } from "react-native";

// // import Login from "@/app-example/components/Login";
// import LoginScreen from "@/my-expo-app/components/LoginScreen";
import LoginScreen from "@/component/LoginScreen";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LoginScreen />
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

// export default function Index() {
//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       {/* <Text>this is Home page</Text> */}
//       {/* <Link href="./(tabs)">Go to home</Link> */}
//       <LoginScreen />
//       {/* <Temp /> */}
//     </ScrollView>
//   );
// }
