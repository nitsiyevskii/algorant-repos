import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "./HomeScreen.styles";

const HomeScreen = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Go Locally</Text>
      <Text style={styles.subtitle}>Your app is ready to build!</Text>
    </View>
  );
};

export default HomeScreen;
