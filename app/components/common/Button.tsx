/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import React from 'react';
import { space } from '../../styles/size';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

/**
 * Props
 */
interface Props extends TouchableOpacityProps {
  styleText?: 'sm' | 'std' | 'lg';
  title?: string;
  type?: 'primary' | 'wide' | 'text-only';
}

/**
 * Button component
 */
export default function Button(props: Props): React.JSX.Element {
  const { styleText, title, type, ...touchableOpacityProps } = props;

  let buttonStyle, containerStyle;
  switch (type) {
    case 'wide':
      buttonStyle = styles.buttonWide;
      containerStyle = styles.buttonWideContainer;
      break;
    case 'text-only':
      buttonStyle = styles.buttonOnlyText;
      containerStyle = styles.buttonContainer;
      break;
    case 'primary':
    default:
      buttonStyle = styles.buttonPrimary;
      containerStyle = styles.buttonContainer;
      break;
  }

  let textStyle;
  switch (styleText) {
    case 'sm':
      textStyle = styles.buttonTextSmall;
      break;
    case 'lg':
      textStyle = styles.buttonTextLarge;
      break;
    case 'std':
    default:
      textStyle = styles.buttonTextStandard;
      break;
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity {...touchableOpacityProps} style={buttonStyle}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const base = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    marginHorizontal: space.hm1,
    marginVertical: space.vm1,
    paddingHorizontal: space.hm2,
    paddingVertical: space.vm2
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const styles = StyleSheet.create({
  // Container Styles
  buttonContainer: {
    alignSelf: 'center'
  },
  buttonWideContainer: {
    alignSelf: 'stretch'
  },

  // Button Styles
  buttonPrimary: {
    ...base.button
  },
  buttonWide: {
    ...base.button,
    backgroundColor: '#e8a2fa'
  },
  buttonOnlyText: {
    ...base.button,
    backgroundColor: 'transparent',
    borderWidth: 0
  },

  // Text Styles
  buttonTextSmall: {
    ...base.buttonText,
    fontSize: 8
  },
  buttonTextStandard: {
    ...base.buttonText,
    fontSize: 20
  },
  buttonTextLarge: {
    ...base.buttonText,
    fontSize: 40
  }
});
