import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function LoginScreen() {
  const [number, setNumber] = useState("");

  return (
    <View style={styles.LoginScreen}>
      <Text style={styles.title}>Tiffin Express</Text>
      <Text style={styles.subTitle}>Log in to Your Tiffin Express Account</Text>
      <Text style={styles.description}>
        Enter your mobile number to order your delicious lunch options.
      </Text>

      <TextInput
        value={number}
        placeholder="Mobile number"
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, ""); // Allow only numbers
          setNumber(filteredText);
        }}
        keyboardType="numeric"
        style={styles.inputBox}
      />

      <Link href="./otp" style={styles.link}>
        <Text style={styles.getOtp}>Get OTP</Text>
      </Link>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  LoginScreen: {
    height: "auto",
    width: "auto",
  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginVertical: 40,
    fontFamily: "YesevaOne-Regular",
  },
  subTitle: {
    width: 300,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "gray",
    lineHeight: 26,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
  },

  link: {
    backgroundColor: "black",
    padding: 10, // Reduced padding
    width: 150, // Set a smaller width
    alignSelf: "center", // Center the button
    borderRadius: 3,
    // marginVertical: 20,
  },

  getOtp: {
    textAlign: "center",
    color: "white",
    fontSize: 20, // Reduced font size
    fontWeight: "bold",
  },
});
