import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { TabContent, TextInput } from "../../components";
import { COLORS } from "../../constants/theme";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import fakeData from "../../constants/fakeData";
import styles from "./Home.style";

const Home = () => {
  const categories = fakeData.categories;
  const movies = fakeData.movies;
  const [selectedCategory, setSelectedCategory] = useState(1);
  const renderProfile = () => {
    return (
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profile}>
          <Image source={fakeData.userProfile.profile_image} style={styles.profileImage} />
          <View>
            <Text style={styles.greetingText}>Welcome</Text>
            <Text style={styles.text}>{fakeData.userProfile.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ios-notifications" style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

    );
  };
  const renderSearch = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput icon="search" placeholder="Search" />
      </View>
    );
  };
  const renderCategory = () => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.subHeaderText}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.categoryItemContainer, {
                backgroundColor: selectedCategory === item.id ? COLORS.blue : COLORS.darkGray,
              }]} onPress={() => {
              setSelectedCategory(item.id);
            }}>
              <Text style={styles.categoryText}> {item.name} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const renderPopular = () => {
    return (
      <View style={styles.popularContainer}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Popular</Text>
          <Text style={styles.subHeaderLink}>See All</Text>
        </View>
        <FlatList
          horizontal
          data={movies}
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieListContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.movieItemContainer} onPress={() => {
              console.log("movie item clicked");
            }}>
              <Image source={{ uri: item.Poster }} style={styles.movieImage} />
            </TouchableOpacity>
          )}
        />

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[COLORS.black, COLORS.darkGray]} style={styles.container}>
        <View style={styles.topContainer}>
          {renderProfile()}
          {renderSearch()}
          {renderCategory()}
          {renderPopular()}
        </View>
        <TabContent screenName="Home" />
      </LinearGradient>
    </SafeAreaView>
  );
};
export default Home;
