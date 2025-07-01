/**
 * Imports
 */
import { APIPayload } from '../../APIPayload';
import populateObject from '../../common/Utility';
import SearchResults from './SearchResults';

/**
 * Example of returned JSON movies payload
 * {
 *   "Search": [
 *     {
 *       "Title": "Friends",
 *       "Year": "1994–2004",
 *       "imdbID": "tt0108778",
 *       "Type": "series",
 *       "Poster": "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
 *     },
 *     {
 *       "Title": "Friends with Benefits",
 *       "Year": "2011",
 *       "imdbID": "tt1632708",
 *       "Type": "movie",
 *       "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2MzQ0NTk4N15BMl5BanBnXkFtZTcwMDc2NDYzNQ@@._V1_SX300.jpg"
 *     },
 *   "totalResults": "2767",
 *   "Response": "True"
 * }
 */

/**
 * Default class for handling the movie payload
 */
export default class Movie {
  /**
   * Member variables
   */
  public searchResults: SearchResults[] | undefined;
  public totalResults: string | undefined;
  public response: string | undefined;

  /**
   * Create Movie instance from API JSON
   * @param json {APIPayload}
   * @return Movie
   */
  public static createFromJSON(json: APIPayload) {
    const result = new Movie();
    populateObject(result, 'totalResults', json.totalResults);
    populateObject(result, 'response', json.Response); // Response changes to response

    if (json.Search) {
      // Search changes to searchResults
      result.searchResults = SearchResults.createArrayFromJSON(json.Search);
    }

    return result;
  } // End of createFromJSON()
} // End of class
// End of file
