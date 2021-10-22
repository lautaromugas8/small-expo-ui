import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import colors from "./assets/colors/colors";
import Task from "./components/Task";

export default function App() {
  const [task, setTasks] = useState({ text: "", completed: false });
  const [allTasks, setAllTasks] = useState([]);

  const handleCompletedPress = (index) => {
    const found = allTasks.find((task, i) => i === index);
    if (!found.completed) {
      setTasks((found.completed = true));
      setTasks({ text: "", completed: false });
    } else {
      setAllTasks(allTasks.filter((task) => task.text !== found.text));
    }
    console.log(allTasks);
  };

  const handleAddPress = () => {
    if (!task) return;
    setAllTasks([...allTasks, task]);
    Keyboard.dismiss();
    setTasks({ text: "", completed: false });
  };

  let [fontsLoaded] = useFonts({
    "TT First Neue Bold": require("./assets/fonts/FontsFree-Net-TTFirsNeue1.ttf"),
    "iA Writer Quattro V": require("./assets/fonts/iAWriterQuattroV.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>tasked</Text>
      </View>

      {/* Tasks */}

      <View style={styles.tasksWrapper}>
        {allTasks.map((task, index) => (
          <Pressable key={index} onPress={() => handleCompletedPress(index)}>
            <Task text={task.text} completed={task.completed} />
          </Pressable>
        ))}
      </View>

      {/* Add Button */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => setTasks({ text, completed: false })}
          value={task.text}
          placeholder={"Write your tasks!"}
        />
        <View style={styles.button}>
          <Pressable onPress={handleAddPress}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    marginTop: 80,
    paddingHorizontal: 27,
  },
  headerTitle: {
    fontFamily: "TT First Neue Bold",
    fontSize: 32,
  },
  tasksWrapper: {
    paddingHorizontal: 27,
    marginTop: 16,
  },
  inputWrapper: {
    position: "absolute",
    top: "80%",
    width: "100%",
    paddingHorizontal: 27,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputText: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 200,
    borderRadius: 60,
    backgroundColor: colors.red,
    color: colors.background,
    fontFamily: "iA Writer Quattro V",
  },
  button: {
    width: 48,
    height: 48,
    backgroundColor: colors.red,
    borderRadius: 48,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: 46,
    left: 11,
    bottom: 4,
  },
});
