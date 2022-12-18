import React, { useEffect } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Details.style";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../constants/theme";
import { Header } from "../../components";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";

const Details = ({ route, navigation }) => {
    const { item } = route.params;
    const movie = item;
    const movieId = movie.imdbID;
    const shownMovies = useSelector(state => state.shownMoviesReducer.movies.reverse());
    const dispatch = useDispatch();

    useEffect(() => {
      return () => {
        setShownMovies();
      };
    }, []);

    const setShownMovies = () => {
      if (shownMovies.find((movie) => movie.movieId === movieId)) {
        dispatch({ type: "REMOVE_MOVIE", payload: movieId });
        dispatch({ type: "ADD_SHOWN_MOVIE", payload: { movie, movieId } });
      } else {
        dispatch({ type: "ADD_SHOWN_MOVIE", payload: { movie, movieId } });
      }
    };

    const renderMovieDetails = () => {
      return (
        <>
          <Image source={{ uri: item.Poster }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.Title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                {item.imdbRating <= 6 ? (
                  <Icon name="ios-star-half-sharp" style={styles.ratingIcon} />
                ) : (
                  <Icon name="star" style={styles.ratingIcon} />
                )} {item.imdbRating}
              </Text>
            </View>
          </View>
          <Text style={styles.plotText}>{item.Plot}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.directorText}>Director: {item.Director}</Text>
            <Text style={styles.actorText}>Actors: {item.Actors}</Text>
            <Text style={styles.tabText}> {item.Released}<Icon2 name="dot-single" size={20} />{item.Runtime} <Icon2
              name="dot-single" size={20} />{item.Country} </Text>
          </View>
        </>
      );
    };
    const renderShownMovies = () => {
      if (shownMovies.length > 0) {
        return (
          <FlatList
            horizontal
            data={shownMovies}
            keyExtractor={item => item?.movieId}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieListContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieItemContainer} onPress={() => navigation.navigate("Details", { item: item.movie })}>
                <Image source={{ uri: item?.movie?.Poster }} style={styles.movieImage} />
              </TouchableOpacity>
            )}
          />);
      } else {
        return (
          <View style={styles.noMoviesContainer}>
            <Text style={styles.noMoviesText}>No movies to show</Text>
          </View>
        );
      }
    };

    return (
      <LinearGradient colors={[COLORS.black, COLORS.darkGray]} style={styles.container}>
        <Header text="Details" leftIcon="chevron-back" rightIcon="share-social-outline"
                onPressLeft={() => navigation.goBack()} />
        <ScrollView style={styles.scrollContainer}>
          {renderMovieDetails()}
          <Text style={styles.subText}>Recently reviewed movies</Text>
            {renderShownMovies()}
        </ScrollView>
      </LinearGradient>
    );
  }
;
export default Details;
