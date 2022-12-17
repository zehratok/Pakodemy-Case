import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './Home.style';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Screen </Text>
    </SafeAreaView>
  );
};
export default Home;
