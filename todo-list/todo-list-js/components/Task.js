import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import colors from "../assets/colors/colors";

const Task = ({ text, completed }) => {
  useFonts({
    "iA Writer Quattro V": require("../assets/fonts/iAWriterQuattroV.ttf"),
  });
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.square}></View>
      <Text
        style={[
          styles.task,
          {
            textDecorationLine: completed ? "line-through" : "none",
            color: completed ? colors.textGrey : colors.textDark,
          },
        ]}
      >
        {text} {completed}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  square: {
    backgroundColor: colors.textDark,
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 16,
  },
  task: {
    fontFamily: "iA Writer Quattro V",
    fontSize: 18,
  },
});

export default Task;
