import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_300Light } from "@expo-google-fonts/nunito";
import { TextInput } from "react-native-paper";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function AddressDetailsScreen() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const navigation = useNavigation();
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_300Light,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View className=" flex-1 mx-5 pt-10" style={{ paddingTop:50,}}>
      <View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          backgroundColor: "#6D6DFA1C",
          zIndex: 0,
          right: 0,
          borderBottomLeftRadius: 170,
        }}
      ></View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-1 mb-5"
      >
        <Ionicons name="chevron-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <View className="flex-1">
        <Text style={styles.title}>Address Details</Text>
        <Text style={styles.desc}>
          Complete address would assist better us in serving you{" "}
        </Text>
        <View className="h-0.5 bg-gray-300  my-5"></View>

        {/* <View style={styles.selectTextContainer}> */}
        <Text style={styles.selectText}>Select address type</Text>
        {/* </View> */}

        <View className="flex flex-row gap-4 mb-7 mt-2">
          <View style={styles.iconsContainers}>
            <AntDesign name="plus" size={30} color="blue" />
          </View>
          <View
            className="flex flex-row gap-2 items-center "
            style={styles.iconsContainers}
          >
            <MaterialCommunityIcons name="home" color="blue" size={30} />
            <Text style={styles.iconTitle}>Home</Text>
          </View>
          <View
            className="flex flex-row gap-2 items-center"
            style={styles.iconsContainers}
          >
            <MaterialIcons name="home-repair-service" size={30} color="blue" />
            <Text style={styles.iconTitle}>Work</Text>
          </View>
        </View>

        {/* <View>
          {[
            "Receiver’s name *",
            "Complete Address *",
            "Nearby landmark (optional)",
          ].map((title, index) => (
            <View
              key={index}
              style={[
                styles.inputBoxContainer,
                focusedInput === title ? styles.inputFocused : null,
              ]}
              
            >
              <Text
                style={[
                  styles.inputTitle,
                  focusedInput === title ? styles.titleFocused : null,
                ]}
                
              >
                {title}
              </Text>
              <TextInput
                style={[
                  styles.inputBox,
                  focusedInput === title ? styles.inputBoxFocused : null,
                ]}
                // placeholder={title.includes("optional") ? "Enter landmark" : ""}
                placeholderTextColor="#A0A0A0"
                onFocus={() => setFocusedInput(title)}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          ))}
        </View> */}

        <AddressForm />
      </View>
    </View>
  );
}

export function AddressForm() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landmark: "",
  });
  const [errors, setErrors] = useState({ name: false, address: false });

  // Function to Save Data
  const saveAddress = async () => {
    try {
      await AsyncStorage.setItem("userAddress", JSON.stringify(formData));
      Alert.alert("Success", "Address saved !");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {
      name: formData.name.trim() === "",
      address: formData.address.trim() === "",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.address) {
      saveAddress(); // ✅ Save data when validation passes
    }
  };
  return (
    <View className="flex-1">
      {/* Receiver’s Name */}
      <View
        style={[
          styles.inputBoxContainer,
          errors.name ? styles.errorBorder : null,
        ]}
      >
        <Text style={styles.inputTitle}>Receiver’s name *</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter name"
          placeholderTextColor="#A0A0A0"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput(null)}
        />
        {errors.name && <Text style={styles.errorText}>Name is required</Text>}
      </View>

      {/* Complete Address */}
      <View
        style={[
          styles.inputBoxContainer,
          errors.address ? styles.errorBorder : null,
        ]}
      >
        <Text style={styles.inputTitle}>Complete Address *</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter address"
          placeholderTextColor="#A0A0A0"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          onFocus={() => setFocusedInput("address")}
          onBlur={() => setFocusedInput(null)}
        />
        {errors.address && (
          <Text style={styles.errorText}>Address is required</Text>
        )}
      </View>

      {/* Nearby Landmark (Optional) */}
      <View style={styles.inputBoxContainer}>
        <Text style={styles.inputTitle}>Nearby landmark (optional)</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter landmark"
          placeholderTextColor="#A0A0A0"
          value={formData.landmark}
          onChangeText={(text) => setFormData({ ...formData, landmark: text })}
          onFocus={() => setFocusedInput("landmark")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Save Address Button */}
      <TouchableOpacity style={styles.SaveAddressButton} onPress={validateForm}>
        <Text style={styles.SaveAddressText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontFamily: "YesevaOne_400Regular",
  },

  desc: {
    fontSize: 19,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
  },

  selectText: {
    fontSize: 19,
    color: "#929AAB",
    marginBottom: 5,
    fontFamily: "Nunito_700Bold",
  },

  iconsContainers: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 7,
  },
  iconTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 19,
  },

  inputBoxContainer: {
    marginVertical: 6,
  },

  inputTitle: {
    fontSize: 18,
    color: "#929AAB",
    fontFamily: "Nunito_700Bold",
  },

  inputBox: {
    backgroundColor: "transparent",
    fontSize: 18,
    height: 40,
    borderWidth: 1,
    borderColor: "#999999",
    borderBottomWidth: 0, //  Removes default bottom border
    marginTop: 8,
    borderBottomColor: "transparent",
    borderRadius: 3,
  },

  inputFocused: {
    borderColor: "black",
  },

  titleFocused: {
    color: "black",
  },

  inputBoxFocused: {
    borderColor: "black",
  },

  errorBorder: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },

  SaveAddressButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 15,
  },

  SaveAddressText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
});

{
  /* 
  ****** Call this function where  need this address data
  
  import AsyncStorage from "@react-native-async-storage/async-storage";

const getSavedAddress = async () => {
  try {
    const data = await AsyncStorage.getItem("userAddress");
    if (data !== null) {
      console.log("Saved Address:", JSON.parse(data));
    } else {
      console.log("No saved address found.");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

getSavedAddress(); 
*/
}
