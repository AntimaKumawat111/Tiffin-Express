import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Dimensions } from "react-native";

import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";
import { TextInput } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
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
          style={{ height: screenHeight * 0.64 }} // heigh is 60% of the screen size
        >
          <Map />

          <View className="absolute mt-20 w-full flex flex-row px-10 items-center gap-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white p-1"
            >
              <Ionicons name="chevron-back-outline" size={30} color="black" />
            </TouchableOpacity>
            <View
              style={styles.inputBoxContainer}
              className="flex flex-row items-center bg-white px-3 flex-1"
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholder="Search for delivery area"
                className="border-b-0"
                style={styles.inputBox}
              />
            </View>
          </View>
          {/* <View className="absolute p-4 bg-white rounded-md bottom-8 right-14">
            <MaterialIcons name="my-location" size={24} color="black" />
          </View> */}
          <View className="p-4 bg-[#6D6DFA33] w-20 h-20 flex items-center justify-center rounded-full ">
            <Image
              source={require("../../assets/images/location.png")}
              style={{
                position: "relative",
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                resizeMode: "contain",
              }}
            />
          </View>
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
                position: "relative",
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

        <Link href="./deivery" className="w-full py-4  bg-black">
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
      </View>
    </View>
  );
}
