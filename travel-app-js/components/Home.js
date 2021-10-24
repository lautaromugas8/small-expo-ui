import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";
import colors from "../assets/colors/colors";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import discoverCategoriesData from "../assets/data/discoverCategoriesData";
import discoverData from "../assets/data/discoverData";

Feather.loadFont();
Entypo.loadFont();

const Home = ({ navigation }) => {
  useFonts({
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
  });

  const renderCategoriesTitle = ({ item }) => {
    return (
      <View style={styles.categoryItemWrapper}>
        <Text
          style={[
            styles.categoryItemTitle,
            {
              color:
                item.id === "discover-categories-1"
                  ? colors.orange
                  : colors.darkGray,
            },
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const renderDiscoverCards = ({ item }) => {
    return (
      <View style={styles.discoverCardWrapper}>
        <Pressable onPress={() => navigation.navigate("Details", { item })}>
          <ImageBackground
            source={item.image}
            style={styles.discoverCardImage}
            borderRadius={20}
          >
            <Text style={styles.discoverCardTitle}>{item.title}</Text>
            <View style={styles.discoverCardLocationWrapper}>
              <Entypo name="location-pin" size={14} color={colors.white} />
              <Text style={styles.discoverCardLocationTitle}>
                {item.location}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };

  return (
    <View styles={styles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaView>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <Feather name="menu" size={32} />
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../assets/images/person.png")}
              style={styles.headerImage}
            />
          </Pressable>
        </View>

        {/* Discover */}
        <View style={styles.discoverWrapper}>
          <Text style={styles.discoverTitle}>Discover</Text>
          <View>
            <FlatList
              data={discoverCategoriesData}
              renderItem={renderCategoriesTitle}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Discover Cards */}
        <View>
          <FlatList
            data={discoverData}
            renderItem={renderDiscoverCards}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Activities */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  discoverWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  discoverTitle: {
    fontSize: 32,
    fontFamily: "Lato-Bold",
    color: colors.black,
  },
  categoryItemWrapper: {
    marginTop: 20,
  },
  categoryItemTitle: {
    marginRight: 30,
    fontSize: 16,
    fontFamily: "Lato-Bold",
  },
  discoverCardWrapper: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  discoverCardImage: {
    width: 170,
    height: 250,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  discoverCardTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    color: colors.white,
  },
  discoverCardLocationWrapper: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  discoverCardLocationTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 14,
    color: colors.white,
    marginLeft: 9,
  },
});

export default Home;
