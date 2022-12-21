import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Loading, Search } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import fakeData from "../../constants/fakeData";
import { apiUrl } from "../../constants/api";
import { useDispatch } from "react-redux";
import styles from "./Home.style";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const categories = fakeData.categories;
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    handlePopularMovies();
  }, []);

  const handlePopularMovies = async () => {
    setLoading(true);
    await axios
      .get(`${apiUrl}s=marvel&page=2`)
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSearch = async (s) => {
    setLoading(true);
    await axios.get(`${apiUrl}s=${s}`)
      .then(res => {
        if (res.data.Response === "True") {
          setError(null);
          setSearchResult(res.data.Search);
        } else {
          setSearchResult([]);
          setError("No result found");
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleGetDetails = (id) => {
    dispatch({ type: "SET_ID", payload: id });
    navigation.navigate("Details");
  };

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
          handleSearch(newSearch);
        }} />
      </View>
    );
  };
  const renderSearchResult = () => {
    return (
      <View style={styles.searchResultContainer}>
        {error ? <Text style={styles.text}>{error}</Text> : (
          <FlatList
            data={searchResult}
            keyExtractor={item => `${item?.imdbID}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.searchResultListContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultItemContainer} onPress={() => {
                handleGetDetails(item.imdbID);
              }}>
                {item?.Poster === "N/A" ? (
                  <Image source={require("../../assets/images/noPoster.png")} style={styles.searchResultImage} />
                ) : (
                  <Image source={{ uri: item?.Poster }} style={styles.searchResultImage} />
                )}
                <Text style={styles.searchResultItemTitle}>{item?.Title}</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
          keyExtractor={item => `${item?.imdbID}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItemContainer} onPress={() => handleGetDetails(item.imdbID)}>
              {item?.Poster === "N/A" ? (
                <Image source={require("../../assets/images/noPoster.png")} style={styles.movieImage} />
              ) : (
                <Image source={{ uri: item?.Poster }} style={styles.movieImage} />
              )}
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
