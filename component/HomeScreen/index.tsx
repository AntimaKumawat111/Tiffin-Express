import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFonts, YesevaOne_400Regular } from "@expo-google-fonts/yeseva-one";
import { Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontLoaded] = useFonts({
    YesevaOne_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.HomePage}>
          <Text style={styles.title}>Tiffin Express</Text>
          <View style={styles.personiconContainer}>
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
      <TouchableOpacity
        style={styles.plusIconContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <FontAwesome5 name="plus" size={35} color="black" />
      </TouchableOpacity>
      {/* modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalButtonItem}
                onPress={() => {
                  setIsModalVisible(false);
                  router.push("./subscription");
                }}
              >
                <MaterialIcons name="dinner-dining" color="#FFD600" size={24} />
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Add Order</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.modalButtonItem}>
                <Ionicons name="call" color="#FFD600" size={24} />
                <Text style={styles.modalButtonText}>Call Us</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
        <Text style={styles.cardPrice}>₹ {price}</Text>
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
    paddingBottom: 30,
  },

  HomePage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  personiconContainer: {
    padding: 8,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    marginBottom: 20,
    fontFamily: "YesevaOne_400Regular",
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
    width: "auto",
    height: 245,
    resizeMode: "cover",
  },

  headingContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  cardTitle: {
    fontSize: 24,
    // fontWeight: 700,
    fontFamily: "Nunito_700Bold",
    
  },
  
  cardDescription: {
    fontSize: 16,
    color: "#929AAB",
    fontWeight: 500,
    fontFamily: "Nunito_700Bold",
  },
  
  cardPriceBtn: {
    backgroundColor: "black",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
    marginTop: 15,
  },
  OrderNowText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 26,
    // fontWeight: 700,
  },
  cardPrice: {
    color: "white",
    fontSize: 26,
    // fontWeight: 700,
    fontFamily: "Nunito_700Bold",

  },
  plusIconContainer: {
    elevation: 7,
    padding: 10,
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    bottom: 145,
    position: "sticky",
  },
  /* Modal Styles */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalContent: {
    width: 200,
    padding: 12,
    backgroundColor: "white",
    position: "absolute",
    bottom: 200,
    right: 20,
  },

  modalButton: {
    borderRadius: 5,
    gap: 8,
  },

  modalButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  modalButtonText: {
    color: "#FFD600",
    fontSize: 20,
  },
});

export default HomeScreen;
