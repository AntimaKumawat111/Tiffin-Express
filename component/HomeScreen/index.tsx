import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface CardDataProps {
  url: string;
  title: string;
  description: string;
  price: number;
}

const cardData: CardDataProps[] = [
  {
    url: "https://s3-alpha-sig.figma.com/img/3b21/d6ea/3e151747842818c025a4d54f84083a8b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QnM0sV0Lg3j2Gf~ixiJM2LFQUzPJDP6vURFVwRjsyfYgomTQ-Ym5SlUtVckGOw~jGytQlpsEmooFvJC-~6aJGs0YONFZgZbz82nAH5TrxCfO4GnIde5PBWXLDbzazMbWNvoEBeGdEY6D4TDJ-Y9o9FuiLoYN6bLU6nJgsbl~LuT9moglW9J2RY-cjVlsEfDd28n40wCOB9-teW8M3nlcMdZ0XXKdSrajChrd3sVT01ZHMAEtceSnGtFEvJr8K0UnR-cDV7kMb4RDbWTXETUq5OcVgqjkbXMBJysXl7lN2Cz8VnWRBGnhgWQ0dzRe88lXsexP~GeQTh8-8ITrQdntjA__",
    title: "Classic lunch box",
    description: "Fresh veggies, rice, 4 roti, fried dal and salad.",
    price: 60,
  },
  {
    url: "https://s3-alpha-sig.figma.com/img/3b21/d6ea/3e151747842818c025a4d54f84083a8b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QnM0sV0Lg3j2Gf~ixiJM2LFQUzPJDP6vURFVwRjsyfYgomTQ-Ym5SlUtVckGOw~jGytQlpsEmooFvJC-~6aJGs0YONFZgZbz82nAH5TrxCfO4GnIde5PBWXLDbzazMbWNvoEBeGdEY6D4TDJ-Y9o9FuiLoYN6bLU6nJgsbl~LuT9moglW9J2RY-cjVlsEfDd28n40wCOB9-teW8M3nlcMdZ0XXKdSrajChrd3sVT01ZHMAEtceSnGtFEvJr8K0UnR-cDV7kMb4RDbWTXETUq5OcVgqjkbXMBJysXl7lN2Cz8VnWRBGnhgWQ0dzRe88lXsexP~GeQTh8-8ITrQdntjA__",
    title: "Premium lunch box",
    description: "Paneer, rice, 4 roti, fried dal, desert and salad.",
    price: 80,
  },
];

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Ensure full screen usage */}
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.HomePage}>
          <Text style={styles.title}>Tiffin Express</Text>
          <View style={styles.icon}>
            <FontAwesome5 name="user-alt" size={24} color="white" />
          </View>
        </View>

        <View>
          {cardData.map((data, index) => (
            <Card key={index} {...data} />
          ))}
        </View>
      </ScrollView>
      {/* Fixed Plus Button */}
      <View style={styles.plusIconContainer}>
        <FontAwesome5 name="plus" size={35} color="black" />
      </View>
    </View>
  );
}

export function Card({ url, title, description, price }: CardDataProps) {
  return (
    <View style={styles.card}>
      {/* Image & Text Side by Side */}
      <View style={styles.containerWithImage}>
        <Image source={{ uri: url }} style={styles.cardImage} />
        <View style={styles.headingContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>

      {/* Order Button & Price */}
      <View style={styles.cardPriceBtn}>
        <Text style={styles.OrderNowText}>Order Now</Text>
        <Text style={styles.cardPrice}>₹{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    minHeight: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    // paddingBottom: 20, // Ensure enough space at the bottom for scrolling
  },

  HomePage: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "black",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    fontFamily: "YesevaOne-Regular",
    width: 200,
  },
  card: {
    marginBottom: 50,
    paddingVertical: 5,
  },

  containerWithImage: {
    borderWidth: 1,
    borderBottomColor: "#929AAB",
  },
  cardImage: {
    borderWidth: 1,
    borderBottomColor: "#929AAB",
    width: "auto", // Fixed width
    height: 245, // Fixed height
    resizeMode: "cover", // Adjust to fit the container
  },

  headingContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardDescription: {
    fontSize: 16,
    color: "#929AAB",
    fontWeight: 500,
  },
  cardPriceBtn: {
    backgroundColor: "black",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    marginTop: 15,
  },
  OrderNowText: {
    color: "white",
    fontSize: 26,
    fontWeight: 700,
  },
  cardPrice: {
    color: "white",
    fontSize: 26,
    fontWeight: 700,
  },
  plusIconContainer: {
    elevation: 5,
    padding: 10,
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    // position: "sticky",
    bottom: 90,
  },
});

export default HomeScreen;
