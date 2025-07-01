/**
 * Imports
 */

import { APIPayload } from '../../APIPayload';
import populateObject from '../../common/Utility';

/**
 * Default class for handling the search results data from the movie payload
 */
export default class SearchResults {
  /**
   * Member Variables
   */
  public title: string | undefined;
  public year: string | undefined;
  public imdbID: string | undefined;
  public type: string | undefined;
  public posterURL: string | undefined;

  /**
   * Create Search Results instance from API JSON
   * @param json {APIPayload}
   * @return SearchResults
   */
  public static createFromJSON(json: APIPayload) {
    const result = new SearchResults();
    populateObject(result, 'title', json.Title); // Title changes to title
    populateObject(result, 'year', json.Year); // Year changes to year
    populateObject(result, 'imdbID', json.imdbID);
    populateObject(result, 'type', json.Type); // Type changes to type
    populateObject(result, 'posterURL', json.Poster); // Poster changes to posterURL
    return result;
  } // End of createFromJSON()

  /**
   * Create instance array from API JSON
   *
   * @param json {APIPayload}
   * @return SearchResults[]
   */
  public static createArrayFromJSON(json: APIPayload): SearchResults[] {
    const result: SearchResults[] = [];
    if (json.length > 0) {
      json.forEach((element: APIPayload) => {
        const searchResultsItem = SearchResults.createFromJSON(element);
        result.push(searchResultsItem);
      });
    }
    return result;
  }
} // End of class
// End of file
