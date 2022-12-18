import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Loading, Search } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import fakeData from "../../constants/fakeData";
import styles from "./Home.style";

const Home = () => {
  const navigation = useNavigation();
  const categories = fakeData.categories;
  const movies = fakeData.movies;
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
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
        <Search onSearchEnter={(newSearch) => {
          setSearch(newSearch);
        }} />
      </View>
    );
  };
  const renderSearchResult = () => {
    return (
      <View style={styles.searchResultContainer}>
        <FlatList
          data={movies}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.searchResultListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchResultItemContainer} onPress={() => {
              navigation.navigate("Details", { item });
            }}>
              <Image source={{ uri: item.Poster }} style={styles.searchResultImage} />
              <Text style={styles.searchResultItemTitle}>{item.Title}</Text>
            </TouchableOpacity>
          )}
        />
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
          renderItem={({ item }) => (
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItemContainer} onPress={() => {
              navigation.navigate("Details", { item });
            }}>
              <Image source={{ uri: item.Poster }} style={styles.movieImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderComponent = () => {
    if (loading) {
      return (
        <Loading />
      );
    } else {
      if (search.length === 0) {
        return (
          <>
            {renderCategory()}
            {renderPopular()}
          </>
        );
      } else {
        return (
          <>
            {renderSearchResult()}
          </>
        );
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderProfile()}
      {renderSearch()}
      {renderComponent()}
    </SafeAreaView>
  );
};
export default Home;
