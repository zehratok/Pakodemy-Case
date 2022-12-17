import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../constants/theme";

const TabContent = ({ screenName }) => {

  const tabItems = {
    home: "Home",
    calendar: "Calendar",
    flame: "Flame",
    profile: "Profile",
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Icon name="home"
              style={screenName === tabItems.home ? styles.mainIcon : styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon name="calendar"
              style={screenName === tabItems.calendar ? styles.mainIcon : styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon name="ios-flame"
              style={screenName === tabItems.flame ? styles.mainIcon : styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon name="ios-person"
              style={screenName === tabItems.profile ? styles.mainIcon : styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
export default TabContent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    backgroundColor: COLORS.transparentBlack3,
    width: SIZES.width * 0.85,
    height: SIZES.height * 0.095,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
  },
  mainIcon: {
    color: COLORS.blue,
    fontSize: SIZES.font * 2.5
  },
  icon: {
    fontSize: SIZES.font * 2,
    color: COLORS.white2
  },
});
