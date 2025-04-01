import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../../navigation/types"; // Adjust path as needed

// type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, "MapScreen">;

// interface MapScreenProps {
//   navigation: MapScreenNavigationProp;
// }

export default function MapScreen() {
  const [location, setLocation] = useState<Region | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  // Get current location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission required");
        setIsLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Search for locations
  const searchLocation = async () => {
    if (searchQuery.length < 3) return;

    setIsLoading(true);
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        setLocation({
          latitude: results[0].latitude,
          longitude: results[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Location search failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer} className="gap-4 w-full px-3 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
            borderRadius: 8,
          }}
          className="px-1 flex items-center justify-center"
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchLocation}
          style={styles.searchInput}
          className="w-[80%]"
        />
      </View>

      {/* Map View */}
      {location && (
        <MapView
          style={styles.map}
          region={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker coordinate={location}>
            <View style={styles.marker}>
              <Image
                source={require("../../assets/images/location.png")}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },

  searchContainer: {
    position: "absolute",
    top: 70,
    // left: 20,
    // right: 20,
    zIndex: 1,
    flexDirection: "row",
  },
  searchInput: {
    // height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  marker: {
    backgroundColor: "#6D6DFA33",
    borderRadius: 20,
    padding:5,
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
