/**
 * Utility Functions
 */

/**
 * Helper method to append to an object record only if the value provided is non-null and non-undefined
 *
 * @param obj
 * @param key
 * @param value
 */
export default function populateObject(obj: object, key: string, value: any) {
  if (undefined !== value && value !== null) {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;
  }
} // End of populateObject()
// End of file
