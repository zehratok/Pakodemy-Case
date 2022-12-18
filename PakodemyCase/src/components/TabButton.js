import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, } from 'react-native';
import {COLORS, SIZES, FONTS} from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";

const TabButton = ({iconName, isSelected, onPress}) => {
  return (
        <TouchableOpacity onPress={onPress}>
          <Icon name={iconName} style={isSelected ? styles.selectedIcon : styles.icon } />
        </TouchableOpacity>
    )
}
export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    color: COLORS.blue,
    fontSize: 30,
  },
  icon: {
    color: COLORS.white2,
    fontSize: 30,
  },
});