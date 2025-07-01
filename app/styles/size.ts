/**
 * Copyright © 2025 - Homewood Health Inc.
 */

/**
 * Imports
 */
import { Dimensions, Platform, StatusBar } from 'react-native';
import {
  horizontalModerateScale,
  horizontalScale,
  verticalModerateScale,
  verticalScale
} from './scale';

/*
 Example to change the global REM
 const entireScreenWidth = Dimensions.get('window').width;
 const rem = entireScreenWidth > 340 ? 18 : 16;
 */
// Export the Default REM used by the application
export const REM = 16;

// Android 'window' dimensions do not always return the correct values depending on device.
// It is more accurate to calculate based on 'screen' dimensions and then account for the status bar height
// Android 'window' dimensions do not always return the correct values depending on device.
// It is more accurate to calculate based on 'screen' dimensions and then account for the status bar height
export const getScreenHeight = () =>
  Platform.OS === 'android' && StatusBar && StatusBar.currentHeight
    ? Dimensions.get('screen').height - StatusBar.currentHeight
    : Dimensions.get('window').height;
export const getScreenWidth = () => Dimensions.get('window').width;

export const space = Object.freeze({
  // Vertical Spacers
  v1: verticalScale(5),
  v2: verticalScale(9),
  v3: verticalScale(18),
  v4: verticalScale(24),
  v5: verticalScale(32),
  v6: verticalScale(44),
  v7: verticalScale(52),
  v8: verticalScale(72),

  vm1: verticalModerateScale(5),
  vm2: verticalModerateScale(9),
  vm3: verticalModerateScale(18),
  vm4: verticalModerateScale(24),
  vm5: verticalModerateScale(32),
  vm6: verticalModerateScale(44),
  vm7: verticalModerateScale(52),
  vm8: verticalModerateScale(72),

  // Horizontal Spacers
  h1: horizontalScale(5),
  h2: horizontalScale(9),
  h3: horizontalScale(18),
  h4: horizontalScale(24),
  h5: horizontalScale(32),
  h6: horizontalScale(44),
  h7: horizontalScale(52),
  h8: horizontalScale(72),

  hm1: horizontalModerateScale(5),
  hm2: horizontalModerateScale(9),
  hm3: horizontalModerateScale(18),
  hm4: horizontalModerateScale(24),
  hm5: horizontalModerateScale(32),
  hm6: horizontalModerateScale(44),
  hm7: horizontalModerateScale(52),
  hm8: horizontalModerateScale(72)
});
