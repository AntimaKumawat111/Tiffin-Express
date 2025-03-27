import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useFonts } from "expo-font";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);

  const [userName, setUserName] = useState("John Doe");
  const [address, setAddress] = useState(
    "123, Main Street, Anytown, USA 12345"
  );
  const [mobileNumber, setMobileNumber] = useState("39232932932");

  const [originalUserName, setOriginalUserName] = useState(userName);
  const [originalAddress, setOriginalAddress] = useState(address);
  const [originalMobileNumber, setOriginalMobileNumber] =
    useState(mobileNumber);

  const [fontLoaded] = useFonts({ Nunito_700Bold });

  useEffect(() => {
    const loadData = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      const storedAddress = await AsyncStorage.getItem("address");
      const storedMobileNumber = await AsyncStorage.getItem("mobileNumber");

      if (storedUserName) {
        setUserName(storedUserName);
        setOriginalUserName(storedUserName);
      }
      if (storedAddress) {
        setAddress(storedAddress);
        setOriginalAddress(storedAddress);
      }
      if (storedMobileNumber) {
        setMobileNumber(storedMobileNumber);
        setOriginalMobileNumber(storedMobileNumber);
      }
    };
    loadData();
  }, []);

  const handleSaveUserName = async () => {
    await AsyncStorage.setItem("userName", userName);
    setOriginalUserName(userName);
    setIsEditing(false);
  };

  const handleSaveAddress = async () => {
    await AsyncStorage.setItem("address", address);
    setOriginalAddress(address);
    setIsEditingAddress(false);
  };

  const handleSaveMobileNumber = async () => {
    await AsyncStorage.setItem("mobileNumber", mobileNumber);
    setOriginalMobileNumber(mobileNumber);
    setIsEditingNumber(false);
  };

  // Function to discard changes if the user taps outside without saving
  const handleDiscardChanges = () => {
    if (isEditing) {
      setUserName(originalUserName);
      setIsEditing(false);
    }
    if (isEditingAddress) {
      setAddress(originalAddress);
      setIsEditingAddress(false);
    }
    if (isEditingNumber) {
      setMobileNumber(originalMobileNumber);
      setIsEditingNumber(false);
    }
  };

  if (!fontLoaded) return null;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleDiscardChanges();
        Keyboard.dismiss();
      }}
    >
      <View className="flex-1">
        <View className="mx-6 flex-1">
          {/* Header with Back and Edit Button */}
          <View className="flex flex-row justify-between mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={40} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                isEditing ? handleSaveUserName() : setIsEditing(true)
              }
            >
              <MaterialIcons
                name={isEditing ? "check" : "edit"}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* User Info Section */}
          <View className="flex flex-row gap-5 items-center">
            <View style={styles.personiconContainer}>
              <FontAwesome5 name="user-alt" size={40} color="white" />
            </View>
            <View>
              {isEditing ? (
                <TextInput
                  style={styles.userName}
                  value={userName}
                  onChangeText={setUserName}
                  autoFocus
                />
              ) : (
                <Text style={styles.userName}>{userName}</Text>
              )}

              {isEditingNumber ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.mobileNumber, { paddingRight: 4 }]}>
                    +91
                  </Text>
                  <TextInput
                    style={[styles.mobileNumber, { flex: 1 }]}
                    value={mobileNumber}
                    onChangeText={(text) =>
                      setMobileNumber(text.replace(/[^0-9]/g, ""))
                    }
                    keyboardType="phone-pad"
                    autoFocus
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.mobileNumber, { paddingRight: 4 }]}>
                    +91
                  </Text>
                  <Text style={styles.mobileNumber}>{mobileNumber}</Text>
                </View>
              )}
            </View>
          </View>
 
          {/* Address Section */}
          <View className="flex flex-row gap-5 my-4 items-center">
            <View className="p-3 rounded-full bg-[#FFC700]/20">
              <Ionicons name="location-sharp" size={30} color="black" />
            </View>
            {isEditingAddress ? (
              <TextInput
                style={[styles.address, { flexShrink: 1 }]}
                value={address}
                onChangeText={setAddress}
                autoFocus
              />
            ) : (
              <Text style={[styles.address, { flexShrink: 1 }]}>{address}</Text>
            )}
          </View>

          <TouchableOpacity
            className="w-full bg-black py-4 px-5 items-start justify-center my-3"
            onPress={() =>
              isEditingAddress ? handleSaveAddress() : setIsEditingAddress(true)
            }
          >
            <Text
              className="text-white text-xl "
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              {isEditingAddress ? "Save Address" : "Change Address"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full bg-black py-4 px-5 items-start justify-center my-3"
            onPress={() =>
              isEditingNumber
                ? handleSaveMobileNumber()
                : setIsEditingNumber(true)
            }
          >
            <Text
              className="text-white text-xl "
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              {isEditingNumber ? "Save Number" : "Change Number"}
            </Text>
          </TouchableOpacity>

          <View className="absolute w-full bottom-5">
            <TouchableOpacity className="w-full bg-black py-4 px-5 items-center justify-center mt-4">
              <Text
                className="text-white text-xl "
                style={{ fontFamily: "Nunito_700Bold" }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            width: 200,
            height: 150,
            backgroundColor: "#FFC7001C",
            zIndex: 0,
            borderTopLeftRadius: 170, // Right side rounded
            bottom: 0,
            right: 0,
          }}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  personiconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 40,
    paddingVertical: 0, // Remove unwanted padding
    includeFontPadding: false, // Fix height inconsistency
    textAlignVertical: "center", // Align text properly
    paddingLeft: 5,
  },

  mobileNumber: {
    fontFamily: "Nunito_700Bold",
    fontSize: 22,
    color: "#929AAB",
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingLeft: 5,
  },

  address: {
    paddingLeft: 5,
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#929AAB",
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
