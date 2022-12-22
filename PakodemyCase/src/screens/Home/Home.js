import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    handlePopularMovies();
  }, []);

  const handlePopularMovies = async () => {
    setLoading(true);
    await axios
      .get(`${apiUrl}s=batman&page=1`)
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

  const handlePagination = useCallback(async (s) => {
    setLoadingMore(true);
    if(page === 1) {
     return null;
    }
    await axios
      .get(`${apiUrl}s=${s}&page=${page}`)
      .then((res) => {
        setSearchResult([...searchResult, ...res.data.Search]);
        console.log("page2", page);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [page]);

  const handleSearch = useCallback(async (s) => {
    setLoading(true);
    console.log("search", s);
    await axios.get(`${apiUrl}s=${s}&page=1`)
      .then(res => {
        setError(null);
        if (res.data.Search.length === 0) {
          setError("No results found");
        } else {
          setSearchResult(res.data.Search);
        }
      })
      .catch(err => {
        setSearchResult([]);
        setError("No results found");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);
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
          setPage(1)
          setLoading(true);
          handleSearch(newSearch);
        }} />
      </View>
    );
  };

  const footerIndicator = () => {
    return (
      loadingMore ?
        <View style={styles.footerIndicator}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View> : null
    );
  };
  const renderSearchResult = () => {
    return (
      <View style={styles.searchResultContainer}>
        {error ? <Text style={styles.text}>{error}</Text> : (
          <FlatList
            data={searchResult}
            keyExtractor={item => item.imdbID}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.searchResultListContainer}
            onEndReached={() => {
              setPage(page + 1);
              handlePagination(search);
            }}
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
            ListFooterComponent={footerIndicator}
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
