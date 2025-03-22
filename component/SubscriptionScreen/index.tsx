import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "./datePicker";

const imageData = [
  {
    imgUrl:
      "https://s3-alpha-sig.figma.com/img/dc03/0759/bb3e209347204cc0a49577094fbbf1ef?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gBokhIn~raLzAAu1qFeWcGafRoJvH0iOztK4os5QBZ9z~K6tEZAtTc~gOEmxExa9W6cqe-jXtloxwGckaXlSJ7S3jrUdQ8Jqom8Vt1sDr8cYAQ-RKZHp144XLV1WOMNoVH5VWWFSMJe~vXEkQHa8ssOgtzrXAFqNolbj3sCmGj-THXOphge9~HtntBGtCC12o8TRUggi53iWYts7nfBYOYj6J9VyYMSCMziKF7UufIB9s7ZK90N~VTCAYknH2phu90K~BC73p7bByM9FX7P5bEPuMLxB1NXNl9n5kHXcu9iWDlAWuLU6tORVbRdm3oEyG~hEpV0lRyOKIaDhcOSF-w__",
    name: "Pickle",
    price: "20",
  },
  {
    imgUrl:
      "https://s3-alpha-sig.figma.com/img/0c71/947e/d5ffca3a4894448174b5222dc1a89174?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Aor86Pt8bQPdntWrWAL2Ap6eQh73M7GbKGcPcTX2Nfw~vKbwHqiDjnkuGt508aN14KURgHrXlOGzWD56zUZSge1w9rCzvqzCNVNiLd8TZy0ZkECltJqEK~zB0TX3Qx9zb-YhgCFRCd6H0aACnl5cHv2i7ABPMC8zH9-QSDLTMsEktyJTz2A8AopuyTEZqX3jEDyZeQp2lIc7WDZ7uJAag9ouKJRo7qokyWnULsHcIBvURdxphdK7BEX0CDUMsHGo27LtzLwDtVvDv7OOXrZIhN~bWZHrc93OpdkxbTWoCZTRKVUuKZMGZuXg9NTxEIXrdnsQmdiHQz7HW~t4eMuoww__",
    name: "Mineral Water",
    price: "20",
  },
];

export default function SubscriptionScreen() {
  const navigation = useNavigation();
  const [totalDays, setTotalDays] = useState(0);

  return (
    <View>
      <View
        style={{
          position: "absolute",
          width: 250,
          height: 230,
          backgroundColor: "#FFD6001C",
          zIndex: 0,
          borderBottomRightRadius: 150,
          borderTopRightRadius: 100,
          borderBottomLeftRadius: 90,
        }}
      ></View>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.gobackIcon}
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}> Subscription</Text>
        <Text style={styles.desc}>
          Indulge in a month-long culinary adventure! Customize meals, set
          start-end dates, and enjoy delightful, hassle-free monthly ordering at
          your door.
        </Text>

        <View style={styles.Container}>
          <DatePicker onDateChange={(days) => setTotalDays(days)} />
        </View>

        {/* image section */}
        <View style={styles.imgContainer}>
          <View style={styles.imagesContainer}>
            {imageData.map((data, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* Absolute Box with 'rs' in center */}
                <View style={styles.priceBox}>
                  <Text style={styles.priceText}>₹{data.price}</Text>
                </View>
                <View style={styles.middleContainer}>
                  <Image source={{ uri: data.imgUrl }} style={styles.image} />
                  <Text style={styles.name}>{data.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  gobackIcon: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
  },
  title: {
    fontWeight: 400,
    fontSize: 40,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 20,
  },
  desc: {
    borderWidth: 1,
    borderColor: "black",
    fontWeight: 500,
    fontSize: 19,
    color: "#929AAB",
    marginBottom: 20,
  },

  Container: {
    width: "auto",
    marginBottom: 20,
  },

  imgContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    alignItems: "center",
  },
  priceBox: {
    position: "absolute",
    zIndex: 1,
    width: 40,
    height: 40,
    backgroundColor: "#FFD600",
    left: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  middleContainer: {
    borderWidth: 2,
    borderColor: "#FFD600",
    borderRadius: 10,
    paddingVertical: 15,
    width: 160,
    height: 160,
    gap: 5,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  name: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 19,
  },
});
