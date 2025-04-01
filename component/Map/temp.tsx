// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from 'react-native-geolocation-service';

// interface Region {
//   latitude: number;
//   longitude: number;
//   latitudeDelta: number;
//   longitudeDelta: number;
// }

// function MapScreen() {
//   const [region, setRegion] = useState<Region | null>(null);

//   // Request location permission (Android)
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Permission",
//             message: "This app needs access to your location.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // iOS handles permissions differently
//   };

//   useEffect(() => {
//     const fetchLocation = async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         alert("Location permission denied");
//         return;
//       }

//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           });
//         },
//         (error) => alert(error.message),
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//       );
//     };

//     fetchLocation();
//   }, []);

//   if (!region) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} region={region}>
//         <Marker coordinate={region} title="Your Location" />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MapScreen;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Platform, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import debounce from "lodash.debounce";

export default function MapScreen() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get current location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // Debounced search function
  const searchPlaces = debounce(async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, 500);

  // Handle search input changes
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    searchPlaces(text);
  };

  // Handle place selection
  const handlePlaceSelect = (place: any) => {
    setSearchQuery(place.city || place.name || "");
    setSearchResults([]);
    
    setLocation({
      latitude: place.latitude,
      longitude: place.longitude,
    });

    mapRef?.animateToRegion({
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Search Container */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
        
        {/* Search Results (using FlatList) */}
        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            style={styles.resultsList}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.resultItem} 
                onPress={() => handlePlaceSelect(item)}
              >
                <Text>
                  {item.city || item.name || item.region || "Unknown location"}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Map View */}
      {location ? (
        <MapView
          ref={(ref) => setMapRef(ref)}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location}>
            <View style={styles.customMarker}>
              <Image
                source={require("../../assets/images/location.png")}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsList: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 200,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
  },
  customMarker: {
    padding: 8,
    backgroundColor: "#6D6DFA33",
    borderRadius: 20,
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});