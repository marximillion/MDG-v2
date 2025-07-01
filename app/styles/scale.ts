/**
 * Copyright © 2025 - Homewood Health Inc.
 */

/**
 * Import
 */
import { Dimensions } from 'react-native';

/**
 * Constants
 */
const HALF_FACTOR = 0.5;
const DEFAULT_ROOT_VALUE = 16;

// Determine and set the short and long dimensions (Portrait & Landscape)
const { height, width, fontScale } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Set the window size
export const window = Object.freeze({
  shortDimension,
  longDimension
});

// ===================================================================== //
// =================== <<<<< REM Like Scaling >>>>> ==================== //
// ===================================================================== //

/**
 * Get Root Value
 * Use the REM value to export size/font objects and use those values to mimic REM values
 * Combine with height/width breakpoints to scale differently depending on device
 * This isn't a true REM value since the user is unable to modify the root value
 * The only user controlled variable they can change is their font scale
 * @param useFontScale
 * @param value
 */
export const getRootValue = (
  useFontScale?: boolean,
  value: number = DEFAULT_ROOT_VALUE
) => (useFontScale ? value * fontScale : value);
export const REM: number = getRootValue();

// ===================================================================== //
// =================== <<<<< Viewport Scaling >>>>> ==================== //
// ===================================================================== //

// General guidelines for using Viewport scaling to look acceptable on most devices
// 1. Use moderate scale for things that will scale over an area like fontSize.
// 2. Use moderate scale for things that can potentially scale over an area
//    like padding, margin, borderWidth, override as necessary.
// 3. Use horizontalScale or verticalScale for purely 1D measurements like width and height in a line divider.
// 4. Apply a scaling factor for moderate scale on a case by case basis
//    when you want things to scale up larger or smaller than normal.
// 5. Use vertical/horizontal according to which dimension is getting modified.
//    Square components, screen layout and orientation can change this.

// Guideline dimensions can be targeted at certain devices to develop with
// then use the scaling helper functions to display contents appropriately on other devices
// Base guideline size is using iPhone 15 sizing as per https://www.ios-resolution.com/ and design mockup
const GUIDELINE_BASE_WIDTH = 393;
const GUIDELINE_BASE_HEIGHT = 852;

/**
 * Horizontal Scale
 * @param size
 */
export const horizontalScale = (size: number) =>
  (shortDimension / GUIDELINE_BASE_WIDTH) * size;

/**
 * Vertical Scale
 * @param size
 */
export const verticalScale = (size: number) =>
  (longDimension / GUIDELINE_BASE_HEIGHT) * size;

/**
 * Horizontal Moderate Scale
 * Scale the viewport and then scale by half
 * @param size
 * @param factor
 */
export const horizontalModerateScale = (
  size: number,
  factor: number = HALF_FACTOR
) => size + (horizontalScale(size) - size) * factor;

/**
 * Vertical Moderate Scale
 * Scale the viewport and then scale by half
 * @param size
 * @param factor
 */
export const verticalModerateScale = (
  size: number,
  factor: number = HALF_FACTOR
) => size + (verticalScale(size) - size) * factor;

// ===================================================================== //
// ======================= <<<<< Aspect Ratio  >>>>> =================== //
// ===================================================================== //

/**
 * Get Height from Width
 * @param sourceWidth
 * @param aspectRatio
 */
export const getHeightFromWidth = (sourceWidth: number, aspectRatio: number) =>
  sourceWidth / aspectRatio; // Returns Height

/**
 * Get Width from Height
 * @param sourceHeight
 * @param aspectRatio
 */
export const getWidthFromHeight = (sourceHeight: number, aspectRatio: number) =>
  sourceHeight * aspectRatio; // Returns Width
