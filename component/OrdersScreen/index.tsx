import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";

import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";

const { height } = Dimensions.get("window");

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

export default function OrdersScreen() {
  const navigation = useNavigation();
  const [totalDays, setTotalDays] = useState(0);
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View>
      <View
        style={{
          position: "absolute",
          width: 250,
          height: 230,
          backgroundColor: "#00C2FF1C",
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

        <Text style={styles.title}>Orders</Text>

        <Text style={styles.desc}>
          Order our add ons with your tempting order.
        </Text>

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

      <View className={tailwindStyles.bottomContainer}>
        <BottomContainer totalValue={totalDays} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // padding: 3,
    marginHorizontal: 20,
    minHeight: "100%",
  },

  gobackIcon: {
    marginTop: 20,
  },
  title: {
    // textAlign: "left",
    fontSize: 40,
    // padding: 0,
    marginVertical: 20,
    fontFamily: "YesevaOne_400Regular",
  },
  //
  desc: {
    fontSize: 19,
    color: "#929AAB",
    marginBottom: 20,
    fontFamily: "Nunito_700Bold",
  },

  imgContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },

  imagesContainer: {
    // gap:3,
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
    fontFamily: "Nunito_700Bold",
  },

  middleContainer: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderWidth: 2,
    borderColor: "#FFD600",
    borderRadius: 10,
    paddingVertical: 15,
    width: 150,
    height: 140,
    gap: 5,
  },

  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  name: {
    textAlign: "center",
    // fontWeight: 700,
    fontSize: 19,
    fontFamily: "Nunito_700Bold",
  },
});

interface DataPropType {
  name?: string; // Optional property
  price: number;
}

const data: DataPropType[] = [
  {
    name: "Tiffin",
    price: 40,
  },
  {
    name: "Pickle",
    price: 40,
  },
];

const orderPrice: DataPropType = {
  price: 50,
};

// console.log(data, orderPrice);

export const tailwindStyles = {
  bottomContainer: "absolute bottom-5 w-full",
  orderBtn:
    "bg-black mx-5 py-4  flex flex-row item-center justify-between px-5",
  OrderNowText: "text-white text-xl ",
  modalBtnPrice: "text-white text-xl",
  modalBtn: "bg-black py-4 mt-6 flex flex-row item-center justify-between px-5",
};

export function BottomContainer({ totalValue }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;

  const openSheet = () => {
    setIsVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  // PanResponder for detecting swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10, // Detect only vertical swipes
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeSheet(); // Close sheet if swiped down enough
        } else {
          openSheet(); // Snap back if not swiped enough
        }
      },
    })
  ).current;

  return (
    <View className="">
      <Pressable onPress={openSheet} className="w-full rounded">
        <View className={tailwindStyles.orderBtn}>
          <Text
            style={{ fontFamily: "Nunito_700Bold" }}
            className={tailwindStyles.OrderNowText}
          >
            Order Now
          </Text>
          <Text
            style={{ fontFamily: "Nunito_700Bold" }}
            className={tailwindStyles.modalBtnPrice}
          >
            ₹ {orderPrice.price}
          </Text>
        </View>
      </Pressable>

      {isVisible && (
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="absolute bottom-0  w-full bg-white h-80 px-5 rounded-t-2xl shadow-lg"
          {...panResponder.panHandlers} // Attach gesture handler
        >
          {/* Draggable Bar for Swipe Down */}
          <Pressable
            onPress={closeSheet}
            className="justify-center items-center flex mb-3"
          >
            <View className="w-1/4 h-2 bg-gray-400 rounded-full"></View>
          </Pressable>

          <View className="flex flex-row justify-between mt-2 px-4 py-4  border-b border-gray-50  ">
            <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-xl">
              Total days selected
            </Text>
            <Text style={{ fontFamily: "Nunito_700Bold" }}>{totalValue}</Text>
          </View>

          {data.map((data, index) => (
            <View
              key={index}
              className="flex flex-row justify-between  mt-4 px-4 py-1 "
            >
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-xl"
              >
                {data.name}
              </Text>
              <Text style={{ fontFamily: "Nunito_700Bold" }}>{data.price}</Text>
            </View>
          ))}

          <View className={tailwindStyles.modalBtn}>
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className={tailwindStyles.OrderNowText}
            >
              Order Now
            </Text>
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className={tailwindStyles.modalBtnPrice}
            >
              ₹ {orderPrice.price}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
