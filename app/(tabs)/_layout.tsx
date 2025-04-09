import { Tabs } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#929AAB",
        tabBarStyle: {
          height: 70,
          marginBottom: 10,
          justifyContent: "center", // Centers items vertically
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications-outline" : "notifications-sharp"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
