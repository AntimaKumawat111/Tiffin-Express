import HomeScreen from "@/app-example/components/HomeScreen";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function Home() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HomeScreen />
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    height: "auto",
    marginHorizontal: 15,
  },
});
