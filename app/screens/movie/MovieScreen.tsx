/**
 * Imports
 */
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Component, ReactNode } from 'react';
import { GlobalStyles } from '../../styles/GlobalStyles';
import Movie from '../../lib/api/model/Movie';
import MovieAgent from '../../lib/api/agent/MovieAgent';
import { RouteProp } from '@react-navigation/native';
import SearchResults from '../../lib/api/model/SearchResults';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Movie'>;
  route: RouteProp<StackParamList, 'Movie'>;
}

/**
 * State
 */
interface State {
  busy: boolean;
  movie: Movie | null;
  movieQuery: string;
  newQuery: boolean;
  numberOfPages: number;
  page: number;
}

/**
 * Movie Screen
 */
export default class MovieScreen extends Component<Props, State> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('MovieScreen::Constructor');

    super(props);

    // initialize state
    this.state = {
      busy: false,
      movie: null,
      movieQuery: '',
      newQuery: false,
      numberOfPages: 0,
      page: 1
    };
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('MovieScreen::OnMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('MovieScreen::UnMount');
  } // End of componentWillMount()

  // ======================================================================= //
  // ===================== <<<<< Action Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Action: Press
   */
  private searchMovies = async () => {
    console.log('MovieScreen::searchMovies');
    // 1: Retrieve variables from state
    const { movieQuery } = this.state;

    // 1.1 Activate busy state for <ActivityIndicator>
    this.setState({
      busy: true
    });

    // 2: Set up of agent
    const movieAgent = new MovieAgent();
    try {
      // 3: Attempt retrieval of movie results for desired movie query
      const movieResponse = await movieAgent.getMovies(movieQuery);

      // 3.1: Determine if returned response is error or not
      if (movieResponse instanceof Error) {
        console.log('ERROR::movieResponse::', movieResponse);
        throw movieResponse;
      } else {
        console.log('movieResponse', movieResponse);
        this.setState({
          movie: movieResponse,
          numberOfPages: Math.ceil(parseInt(movieResponse.totalResults) / 10)
        });
      }
    } catch (error: any) {
      // Display any error message in a native Alert
      Alert.alert('Error', `message: ${error.message}`);
    } finally {
      // 4: Disable busy state for <ActivityIndicator> and reset page to 1
      this.setState({
        busy: false,
        page: 1
      });
    }
  }; // End of searchMovies()

  /**
   * Action: Press
   * increase page number
   */
  private nextPage = async () => {
    console.log('MovieScreen::nextPage');
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({
      page: nextPage
    });
    await this.loadMoreMovies(nextPage);
  }; // End of nextPage()

  /**
   * Action: Press
   * decrease page number
   */
  private previousPage = async () => {
    console.log('MovieScreen::previousPage');
    const { page } = this.state;
    const previousPage = page - 1;
    this.setState({
      page: previousPage
    });
    await this.loadMoreMovies(previousPage);
  }; // End of previousPage()

  /**
   * Action: Press
   */
  private loadMoreMovies = async (pageNumber: number) => {
    console.log('MovieScreen::loadMoreMovies');

    // 1: Retrieve variables from state
    const { movieQuery } = this.state;

    // 1.1 Activate busy state for <ActivityIndicator>
    this.setState({
      busy: true
    });

    // 2: Set up of agent
    const movieAgent = new MovieAgent();
    try {
      // 3: Attempt retrieval of movie results for desired movie query
      const movieResponse = await movieAgent.getMovies(movieQuery, pageNumber);

      // 3.1: Determine if returned response is error or not
      if (movieResponse instanceof Error) {
        console.log('ERROR::movieResponse::', movieResponse);
        throw movieResponse;
      } else {
        console.log('movieResponse', movieResponse);
        this.setState({
          movie: movieResponse
        });
      }
    } catch (error: any) {
      // Display any error message in a native Alert
      Alert.alert('Error', `message: ${error.message}`);
    } finally {
      // 4: Disable busy state for <ActivityIndicator>
      this.setState({
        busy: false
      });
    }
  }; // End of loadMoreMovies()

  /**
   * Navigator: Webview
   * - Navigation to webview
   */
  private navigateWebview = (title?: string) => {
    const url = `https://www.google.ca/search?q=${title}`;
    this.props.navigation.navigate('SimpleWebView', { url });
  }; // End of navigateWebview()

  // ======================================================================= //
  // ===================== <<<<< Render Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Render: Movie Screen
   */
  public render(): ReactNode {
    console.log('MovieScreen::Render');

    // 1: Extract variables from state
    const { busy, movie, movieQuery, numberOfPages, page } = this.state;
    const firstPage: boolean = page == 1;

    // 2: Create variable from movie object
    let resultsArray: SearchResults[] = [];
    const morePagesAvailable = page < numberOfPages;
    if (movie && movie.searchResults) {
      resultsArray = movie.searchResults;
    }
    return (
      <SafeAreaView
        style={[GlobalStyles.safeAreaContainer, { backgroundColor: 'black' }]}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.scrollViewContentContainer}>
          {/* Screen Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{'Movie Screen'}</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            {/* Input box for movie search */}
            <TextInput
              style={styles.inputBox}
              onChangeText={(movie: string) =>
                this.setState({ movieQuery: movie })
              }
              value={movieQuery}
              placeholder={'Search for a movie...'}
              placeholderTextColor={'black'}
            />

            {/* Search button */}
            <TouchableOpacity
              style={[
                styles.button,
                movieQuery ? styles.enabledButton : styles.disabledButton
              ]}
              onPress={this.searchMovies}
              disabled={!movieQuery}>
              {busy ? (
                <ActivityIndicator animating={busy} />
              ) : (
                <Text style={styles.buttonText}>{'Search'}</Text>
              )}
            </TouchableOpacity>

            {/* Page buttons */}
            <View style={styles.pagesBtnContainer}>
              {/* Previous Page */}
              <TouchableOpacity
                style={[
                  styles.button,
                  !firstPage ? styles.enabledButton : styles.disabledButton
                ]}
                onPress={this.previousPage}
                disabled={firstPage}>
                {busy ? (
                  <ActivityIndicator animating={busy} />
                ) : (
                  <Text style={styles.buttonText}>{'Previous Page'}</Text>
                )}
              </TouchableOpacity>

              {/* Next Page */}
              <TouchableOpacity
                style={[
                  styles.button,
                  morePagesAvailable
                    ? styles.enabledButton
                    : styles.disabledButton
                ]}
                onPress={this.nextPage}
                disabled={!morePagesAvailable}>
                {busy ? (
                  <ActivityIndicator animating={busy} />
                ) : (
                  <Text style={styles.buttonText}>{'Next Page'}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* TODO: create new method to renderResults? */}
          {/* {this.renderResults} */}

          {/* Display movie results if they exist */}
          {movie && (
            <View style={styles.resultsContainer}>
              <Text
                style={
                  styles.resultsText
                }>{`# of movies found: ${movie.totalResults}`}</Text>
              <Text
                style={
                  styles.resultsText
                }>{`# of pages: ${numberOfPages}`}</Text>
              <Text style={styles.resultsText}>{`Current page: ${page}`}</Text>
              {resultsArray.map((movieResults, key) => (
                <View key={key} style={styles.itemContainer}>
                  <Text
                    style={
                      styles.itemText
                    }>{`${movieResults.title}\n[${movieResults.type}]`}</Text>
                  <View style={styles.moviePosterContainer}>
                    <TouchableOpacity
                      onPress={() => this.navigateWebview(movieResults.title)}>
                      <Image
                        style={styles.moviePoster}
                        source={{
                          uri:
                            movieResults.posterURL !== 'N/A'
                              ? movieResults.posterURL
                              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  } // End of render()
} // End of class

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'black',
    flex: 1
    // paddingTop: Platform.OS !== 'ios' ? 20 : 0,
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 40
  },
  scrollViewContentContainer: {
    backgroundColor: 'black',
    flexGrow: 1
  },
  titleContainer: {
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red'
  },
  searchContainer: {
    alignItems: 'center'
  },
  pagesBtnContainer: {
    flexDirection: 'row'
  },
  inputBox: {
    backgroundColor: 'rgba(250, 110, 122, 0.7)',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '90%'
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow effect
    width: '40%'
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  enabledButton: {
    backgroundColor: 'rgba(250, 110, 122, 0.7)'
  },
  disabledButton: {
    backgroundColor: '#d3d3d3'
  },
  resultsContainer: {
    alignItems: 'center'
  },
  resultsText: {
    fontSize: 20,
    color: 'red',
    paddingVertical: 20
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  itemText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center'
  },
  moviePosterContainer: {
    height: 450,
    overflow: 'hidden',
    width: 300
  },
  moviePoster: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 30
  }
});
// End of file
