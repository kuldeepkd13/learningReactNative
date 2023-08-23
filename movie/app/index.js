import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const API_KEY = '3a1115e4';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
      setMovies(response.data.Search || []);
      setLoading(false);
    } catch (error) {
      console.error('Error searching for movies:', error);
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
      setSelectedMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const renderMovieItem = (movie) => (
    <TouchableOpacity
      key={movie.imdbID}
      style={styles.movieContainer}
      onPress={() => getMovieDetails(movie.imdbID)}
    >
      <Image source={{ uri: movie.Poster }} style={styles.moviePoster} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{movie.Title}</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => getMovieDetails(movie.imdbID)}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Movie Search</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchMovies}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {selectedMovie ? (
        <View style={styles.movieDetailsContainer}>
          <Image source={{ uri: selectedMovie.Poster }} style={styles.movieDetailsImage} />
          <Text style={styles.movieDetailsText}>Title: {selectedMovie.Title}</Text>
          <Text style={styles.movieDetailsText}>Year: {selectedMovie.Year}</Text>
          <Text style={styles.movieDetailsText}>Plot: {selectedMovie.Plot}</Text>
          <Text style={styles.movieDetailsText}>Genre: {selectedMovie.Genre}</Text>
          <Text style={styles.movieDetailsText}>Actors: {selectedMovie.Actors}</Text>
          <Text style={styles.movieDetailsText}>Country: {selectedMovie.Country}</Text>
          <Text style={styles.movieDetailsText}>Language: {selectedMovie.Language}</Text>
          <Text style={styles.movieDetailsText}>Rating: {selectedMovie.imdbRating}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedMovie(null)}
          >
            <Text style={styles.buttonText}>Back to Results</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.movieList}>
          {movies.map((movie) => renderMovieItem(movie))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieList: {
    paddingHorizontal: 20,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  moviePoster: {
    width: 100,
    height: 150,
  },
  movieDetails: {
    flex: 1,
    padding: 15,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  movieDetailsContainer: {
    margin: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  movieDetailsImage: {
    width: '100%',
    height: 300,
    marginBottom: 15,
    borderRadius: 8,
  },
  movieDetailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
});

export default App;
