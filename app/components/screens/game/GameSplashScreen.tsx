/**
 * Copyright (c) MJDG 2025.
 */

/**
 * Imports
 */
import { Component, ReactNode } from 'react';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/images';
import { RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../common/ScreenContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'GameSplash'>;
  route: RouteProp<StackParamList, 'GameSplash'>;
}

/**
 * State
 */
interface State { }

class GameSplashScreen extends Component<Props, State> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('GameSplashScreen::constructor');

    super(props);

    this.state = {};
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('GameSplashScreen::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('GameSplashScreen::componentWillUnmount');
  } // End of componentWillMount()

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigation: Game
   * - Navigate to game screen
   */
  private navigateGame = () => {
    console.log('GameSplashScreen::navigateGame');
    const { navigation } = this.props;
    navigation.navigate('Game');
  }; // End of navigateGame()

  // ======================================================================= //
  // ===================== <<<<< Render Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Render: Home Screen
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    console.log('GameSplashScreen::render');
    return (
      <ScreenContainer withImageBackground={true}>
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.imageTile}
            onPress={this.navigateGame}
          >
            <Image
              source={images.barangay_feud_logo}
              style={GlobalStyles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>
      </ScreenContainer>
    );
  } // End of render()
} // End of class

export default GameSplashScreen;

// ======================================================================= //
// ===================== <<<<< StyleSheets >>>>> ====================== //
// ======================================================================= //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageTile: {
    borderRadius: 50,
    // borderWith: 5,
    height: 500,
    marginHorizontal: 20,
    marginVertical: 5,
    overflow: 'hidden',
  },
});
