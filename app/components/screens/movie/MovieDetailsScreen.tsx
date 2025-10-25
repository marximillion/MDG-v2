/**
 * Imports
 */

import { Component, ReactNode } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../navigation/StackParamList';
import { RouteProp } from '@react-navigation/native';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'MovieDetails'>;
  route: RouteProp<StackParamList, 'MovieDetails'>;
}

export interface MovieDetailsProps {
  posterURL: string | undefined;
}

/**
 * State
 *
 */
interface State {
  busy: boolean;
}

/**
 * Movie Details Screen
 */
export default class MovieDetailsScreen extends Component<Props, State> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('MovieDetailsScreen::constructor');

    super(props);
    this.state = {
      busy: false
    };
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('MovieDetailsScreen::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('MovieDetailsScreen::componentWillUnmount');
  } // End of componentWillMount()

  // ======================================================================= //
  // ===================== <<<<< Action Methods >>>>> ====================== //
  // ======================================================================= //

  // ======================================================================= //
  // ===================== <<<<< Render Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Render: Movie Details Screen
   */
  public render(): ReactNode {
    console.log('MovieDetailsScreen::render');

    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text>{'TEST'}</Text>
      </SafeAreaView>
    );
  }
} // End of class

// ======================================================================= //
// ====================== <<<<< StyleSheets >>>>> ======================== //
// ======================================================================= //

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: Platform.OS !== 'ios' ? 20 : 0
  }
});

// End of file
