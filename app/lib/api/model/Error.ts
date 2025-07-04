/**
 * Imports
 */
import { APIPayload } from '../../APIPayload';
import populateObject from '../../common/Utility';

/**
 * Default class for handling errors
 */
export class CustomError{
  /**
   * Member Variables
   */
  public response: string | undefined;
  public message: string | undefined;

  /**
   * Create Error instance from APi JSON
   *
   * @param json {APIPayload}
   * @returm Error
   */
  public static createFromJSON(json: APIPayload): Error {
    const result = new Error();
    populateObject(result, 'response', json.Response); // Response changes to response
    populateObject(result, 'message', json.Error); // Error changes to message
    return result;
  } // End of createFromJSON()
} // End of class
// End of file
