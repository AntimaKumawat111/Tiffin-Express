import { Link, useNavigation } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Dimensions } from "react-native";

import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";
import Map from "../Map";

const screenHeight = Dimensions.get("window").height; // screen's total height

export default function ChangeAddressScreen() {
  const navigation = useNavigation();
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View className="flex-1 ">
      <View className="">
        <View
          className="relative w-full flex-1"
          style={{ height: screenHeight * 0.67 }} // heigh is 60% of the screen size
        >
          <Map />
        </View>
      </View>
      <BottomContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    borderColor: "black",
    borderWidth: 1,
    // padding: 3,
    marginHorizontal: 20,
    minHeight: "100%",
  },

  title: {
    fontSize: 19,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
    // marginVertical: 10,
  },

  gobackIcon: {
    marginTop: 20,
  },

  inputBoxContainer: {
    flex: 1,
  },

  inputBox: {
    backgroundColor: "transparent",
    fontSize: 16,
    height: 35,
    padding: 0,
    flex: 1,
  },
});

export function BottomContainer() {
  return (
    <View className="bg-white w-full rounded-t-xl flex-1 py-4 px-6">
      <View
        className="h-1 bg-gray-400 my-4 w-20 "
        style={{ alignSelf: "center" }}
      ></View>

      <View className="flex-1 justify-between">
        <Text style={styles.title}>Confirm your order delivery location</Text>

        <View
          className="h-0.5 bg-gray-200 w-full "
          style={{ alignSelf: "center" }}
        ></View>

        <View className="flex flex-row items-center w-full gap-4 ">
          <View className="rounded-lg p-4 bg-[#6D6DFA33]">
            <Image
              source={require("../../assets/images/location.png")}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                resizeMode: "contain",
              }}
            />
          </View>
          <View className="flex-1">
            <Text
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: 20,
              }}
            >
              123, Main Street{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Nunito_600SemiBold_Italic",
                fontSize: 15,
                color: "#00000080",
              }}
            >
              123, Main Street, Anytown, USA 12345
            </Text>
          </View>
        </View>

        <TouchableOpacity>
          <Link href="./AddressDetails" className="w-full py-4  bg-black">
            <Text
              className="text-white"
              style={{
                fontFamily: "Nunito_700Bold",
                color: "white",
                fontSize: 26,
                textAlign: "center",
              }}
            >
              Confirm and add details
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
