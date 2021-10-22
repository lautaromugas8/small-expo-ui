import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../assets/colors/colors";
import * as Font from "expo-font";

const Details = ({ route, navigation }) => {
  const { item } = route.params;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const renderIngredients = ({ item }) => {
    return (
      <View style={styles.ingredientsImageWrapper}>
        <Image source={item.image} style={styles.ingredientsImage} />
      </View>
    );
  };

  useEffect(() => {
    Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Top */}
        <View style={styles.headerTopWrapper}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <View style={styles.headerTopArrow}>
              <Feather name="chevron-left" size={8} color={colors.darkText} />
            </View>
          </Pressable>
          <View style={styles.headerTopStar}>
            <MaterialCommunityIcons
              name="star"
              size={12}
              color={colors.white}
            />
          </View>
        </View>

        {/* Header Bottom */}
        <View style={styles.headerBottomWrapper}>
          <Text style={styles.headerBottomTitle}>{item.title}</Text>
          <Text style={styles.headerBottomPrice}>${item.price}</Text>
        </View>

        {/* Pizza */}
        <View style={styles.pizzaWrapper}>
          <View>
            <Text style={styles.pizzaTitles}>Size</Text>
            <Text style={styles.pizzaInfo}>
              {item.sizeName} {item.sizeNumber}"
            </Text>
            <Text style={styles.pizzaTitles}>Crust</Text>
            <Text style={styles.pizzaInfo}>{item.crust}</Text>
            <Text style={styles.pizzaTitles}>Delivery in</Text>
            <Text style={styles.pizzaInfo}>{item.deliveryTime} min</Text>
          </View>
          <View style={styles.pizzaImage}>
            <Image source={item.image} />
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.ingredientsWrapper}>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          <FlatList
            data={item.ingredients}
            renderItem={renderIngredients}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Place an order */}
        <Pressable onPress={() => alert("Ordered")}>
          <View style={styles.orderButton}>
            <Text style={styles.orderText}>Place an order</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTopWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTopArrow: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderColor: colors.lightText,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTopStar: {
    borderWidth: 2,
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBottomWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerBottomTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
    color: colors.darkText,
  },
  headerBottomPrice: {
    marginTop: 20,
    color: colors.price,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 32,
  },
  pizzaWrapper: {
    marginTop: 30,
    paddingLeft: 20,
    flexDirection: "row",
  },
  pizzaTitles: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 5,
  },
  pizzaInfo: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: colors.darkText,
    marginBottom: 20,
  },
  pizzaImage: {
    marginLeft: 24,
  },
  ingredientsWrapper: {
    marginTop: 30,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: colors.darkText,
  },
  ingredientsImageWrapper: {
    marginTop: 20,
    paddingLeft: 20,
  },
  ingredientsImage: {
    // reemplazar borderWidth, borderColor => box shadow
    borderWidth: 1,
    borderColor: colors.lightText,
    borderRadius: 15,
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  orderButton: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    marginBottom: 30,
  },
  orderText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: colors.darkText,
  },
});

export default Details;
