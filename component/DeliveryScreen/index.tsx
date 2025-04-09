import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_600SemiBold_Italic } from "@expo-google-fonts/nunito";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeliveryScreen() {
  const navigation = useNavigation();

  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_600SemiBold_Italic,
  });

  if (!fontLoaded) {
    return null;
  }

  const address = {
    address: "123, Main Street, Anytown, USA 12345",
  };

  return (
    <View className="flex-1 flex justify-between" style={{ paddingTop:50,}}>
      {/* Background Shape */}

      <View
        style={{
          position: "absolute",
          width: 250,
          height: 200,
          backgroundColor: "#00C2FF1C",
          zIndex: 0,
          borderBottomRightRadius: 170, // Right side rounded
        }}
      ></View>

      <View className=" mx-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-1 mb-5"
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text
          className={tailwindStyles.title}
          style={{ fontFamily: "YesevaOne_400Regular", fontSize: 40 }}
        >
          Delivery
        </Text>

        <Text style={styles.desc}>
          Select where you want your lunch box delivered. It's easy! Just choose
          your address from the options provided below.
        </Text>
        <NameContainer address={address} />
        <View className="h-0.5 bg-gray-300 "></View>

        <Text style={styles.myAddress}>My Address</Text>

        <AddNewAddreses />

        <WorkContainer address={address} />
      </View>

      <TouchableOpacity>
        <Link href={"./AddressDetails"} style={styles.continuebtn}>
          {/* <View className="w-full flex flex-row justify-between items-center"> */}
          <Text style={styles.continueText}>Continue</Text>
          {/* </View> */}
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export function NameContainer({ address }: { address: { address: string } }) {
  const [name, setName] = useState("John Doe"); // State for name
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode

  // Load saved name from AsyncStorage when the component mounts
  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error("Error loading name:", error);
      }
    };
    loadName();
  }, []);

  // Save name to AsyncStorage
  const handleSaveName = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  return (
    <View className={tailwindStyles.nameContainer}>
      <View className="flex flex-row justify-between items-center mb-5">
        {isEditing ? (
          <View className="flex flex-row items-center justify-between gap-2">
            <TextInput
              value={name}
              onChangeText={setName}
              autoFocus
              multiline={true}
              scrollEnabled={false}
              style={styles.name}
            />
            <TouchableOpacity onPress={handleSaveName}>
              <MaterialIcons name="check-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        {!isEditing && (
          <TouchableOpacity
            className={tailwindStyles.changeBtncontainer}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.changebtn}>Change</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.address}>{address.address}</Text>
    </View>
  );
}

export function WorkContainer({ address }: { address: { address: string } }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TouchableOpacity
      className={`w-full p-6 rounded-md my-9 flex border-2 flex-row gap-4 ${
        isClicked
          ? "bg-[#00B4D81A] border-[#00B4D8]  "
          : "bg-white border-gray-200"
      }`}
      onPress={() => setIsClicked(!isClicked)} // Toggle state on click
    >
      {/* Icon */}

      <View className={tailwindStyles.iconContainer}>
        <MaterialIcons name="home-repair-service" size={30} color="white" />
      </View>

      {/* Text */}
      <View className="flex-1 min-w-0">
        <Text
          style={{
            fontFamily: "Nunito_700Bold",
            fontSize: 19,
            // color: isClicked ? "white" : "black", // Change text color
          }}
        >
          Work
        </Text>
        <Text
          style={{
            fontFamily: "Nunito_600SemiBold_Italic",
            fontSize: 16,
            // color:'black'
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {address.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function AddNewAddreses() {
  return (
    <Link
      href="/changeAddress"
      className="bg-[#1c9ab31a] border-[#00B4D8] p-4  border rounded-md "
    >
      <View className="w-full flex flex-row items-center gap-2">
        <MaterialIcons name="add-location" size={30} color="#00B4D8" />
        <Text style={styles.addNewAddress}>Add new address</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },

  desc: {
    fontSize: 19,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
  },

  name: {
    fontFamily: "Nunito_700Bold",
    fontSize: 22,
    color: "white",
    paddingVertical: 0,
    includeFontPadding: false, 
    textAlignVertical: "center", 
    paddingLeft: 5,
    flex: 1,
    maxWidth: 180,
    minWidth: 180,
  },

  changebtn: {
    fontFamily: "Nunito_700Bold",
    fontSize: 19,
  },

  address: {
    fontFamily: "Nunito_600SemiBold_Italic",
    color: "#FFFFFFB2",
    fontSize: 18,
  },

  addressWork: {
    fontFamily: "Nunito_600SemiBold_Italic",
    color: "#929AAB",
    fontSize: 16,
    // flexWrap: "wrap",
    flexWrap: "wrap", // टेक्स्ट को लपेटने के लिए
    overflow: "hidden",
  },
  workTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 19,
  },

  myAddress: {
    fontFamily: "YesevaOne_400Regular",
    fontSize: 26,
    marginVertical: 15,
  },

  addNewAddress: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#00B4D8",
  },

  continuebtn: {
    backgroundColor: "black",
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },

  continueText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 26,
    textAlign: "center",
  },
});

export const tailwindStyles = {
  title: "mb-5",
  nameContainer: "w-full py-4 px-6 rounded-md  bg-[#00B4D8] my-9 ",
  changeBtncontainer: "bg-white flex items-center justify-center px-4 py-1",
  workContainer:
    "w-full p-6 hover:bg-[#00B4D8] rounded-md  bg-white flex flex-row gap-4",
  iconContainer:
    "bg-[#00B4D8] p-1 flex items-center justify-center rounded-lg  w-14 h-14",
};
