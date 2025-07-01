/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {images} from '../../assets/images';
import React, {Component, ReactNode} from 'react';
import {space} from '../../styles/size';

/**
 * Props
 */
interface Props {
  edges?: Edges;
  safeAreaViewStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  withImageBackground: boolean;
  imageSource?: StyleProp<ImageSourcePropType>;
  children?: React.ReactNode;
}

/**
 * Practice Screen
 */
export default class ScreenContainer extends Component<Props> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: React.PropsWithChildren<Props>) {
    super(props);
  } // End of constructor()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: With image background
   */
  private renderWithImageBackground = () => {
    const {safeAreaViewStyle, imageSource} = this.props;
    const backgroundImage = imageSource ?? images.background_image;

    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode={'cover'}
        style={GlobalStyles.image}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView
          style={[
            safeAreaViewStyle,
            styles.safeAreaWithImageBackgroundContainer,
          ]}
          edges={['right', 'bottom', 'left']}>
          {this.props.children}
        </SafeAreaView>
      </ImageBackground>
    );
  };

  /**
   * Render: Without image background
   */
  private renderWithoutImageBackground = () => {
    const {safeAreaViewStyle} = this.props;

    return (
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView
          style={[
            safeAreaViewStyle,
            styles.safeAreaWithoutImageBackgroundContainer,
          ]}
          edges={['right', 'bottom', 'left']}>
          {this.props.children}
        </SafeAreaView>
      </>
    );
  };

  /**
   * Render: Main
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    const {withImageBackground} = this.props;

    return withImageBackground
      ? this.renderWithImageBackground()
      : this.renderWithoutImageBackground();
  } // End of render()
} // End of class

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styles = StyleSheet.create({
  safeAreaWithImageBackgroundContainer: {
    flex: 1,
    paddingTop: space.vm7,
    width: '100%',
  },
  safeAreaWithoutImageBackgroundContainer: {
    flex: 1,
    paddingTop: space.vm7,
  },
}); // End of styles()
//End of file
