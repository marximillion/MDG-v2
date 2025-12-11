/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import React from 'react';
import { space } from '../../styles/size';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from 'react-native';

/**
 * Props
 */
interface Props extends TouchableOpacityProps {
  styleText?: 'sm' | 'std' | 'lg';
  title?: string;
  type?: 'primary' | 'wide' | 'text-only';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  
}

/**
 * Button component
 */
export default function Button(props: Props): React.JSX.Element {
  const { style,styleText, title, type, ...touchableOpacityProps } = props;

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
      <TouchableOpacity {...touchableOpacityProps} style={[buttonStyle, style]}>
        <Text style={[textStyle, props.textStyle]}>{title}</Text>
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
    alignSelf: 'stretch',
    flexGrow: 1,
    // width: '100%'
  },

  // Button Styles
  buttonPrimary: {
    ...base.button
  },
  buttonWide: {
    ...base.button,
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
