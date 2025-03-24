import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";

function LoginScreen() {
  const [number, setNumber] = useState("");
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

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
    marginHorizontal: 12,
  },

  title: {
    fontSize: 45,
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 600,
    fontFamily: "YesevaOne_400Regular",
  },

  subTitle: {
    fontSize: 31,
    marginTop: 20,
    fontFamily: "Nunito_700Bold",
  },

  description: {
    fontSize: 24,
    marginVertical: 10,
    color: "gray",
    lineHeight: 26,
    fontFamily: "Nunito_500Medium",
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
    fontFamily: "Nunito_500Medium",
  },

  link: {
    backgroundColor: "black",
    padding: 10,
    width: 180,
    alignSelf: "center",
    borderRadius: 3,
  },

  getOtp: {
    textAlign: "center",
    color: "white",
    fontSize: 26,
    fontFamily: "Nunito_500Medium",
  },
});
