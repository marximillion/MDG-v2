/**
 * Imports
 */

import { APIPayload } from '../../APIPayload';
import Error from '../model/Error';
import Movie from '../model/Movie';

/**
 * Constants
 */
const MOVIE_API_KEY = 'a67c9774';

const MOVIE_BASE_URL = 'https://www.omdbapi.com/';

/**
 * Handles the API for making movie API calls
 */
export default class MovieAgent {
  /**
   * Make call for movies API
   */
  public getMovies = async (movieQuery: string, page?: number) => {
    console.log('MovieAgent::getMovies');

    try {
      // 1: Construct the URL
      const url = page
        ? `${MOVIE_BASE_URL}?s=${movieQuery}&page=${page}&apikey=${MOVIE_API_KEY}`
        : `${MOVIE_BASE_URL}?s=${movieQuery}&apikey=${MOVIE_API_KEY}`;
      // if (page) {
      //   url= `${MOVIE_BASE_URL}?s=${movieQuery}&page=${page}&apikey=${MOVIE_API_KEY}`;
      // } else {
      //   url = `${MOVIE_BASE_URL}?s=${movieQuery}&apikey=${MOVIE_API_KEY}`;
      // }

      // 2: Fetch the API
      const response: Response = await fetch(url);

      // 3: Retrieve the JSON response
      const jsonResponse: APIPayload = await response.json();

      // 4: Check for OK Response, retrieve message if call failed and throw error to catch
      if (jsonResponse.Response === 'False') {
        throw Error.createFromJSON(jsonResponse);
      }

      // 5: Marshal raw payload into Movie object and return it
      return Movie.createFromJSON(jsonResponse);
    } catch (error: any) {
      // Return any error back to screen
      return error;
    }
  }; // End of getMovies()

  /**
   * Make call for movie details API
   */
  public getMovieDetails = async () => {};
}
