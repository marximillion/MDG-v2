/**
 * Imports
 */
import { Component, ReactNode } from 'react';
import {
  horizontalModerateScale,
  verticalModerateScale
} from '../../../styles/scale';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '../../../assets/images';
import { RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../common/ScreenContainer';
import { space } from '../../../styles/size';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Practice'>;
  route: RouteProp<StackParamList, 'Practice'>;
}

/**
 * State
 */
interface State {
  inputText: string;
  submittedTexts: [];
}

/**
 * Practice Screen
 */
export default class PracticeScreen extends Component<Props, State> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: Props) {
    super(props);

    // initialize state
    this.state = {
      inputText: '',
      submittedTexts: []
    };
  } // End of constructor()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: Main
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    return (
      <ScreenContainer withImageBackground={true}>
        <View style={styleSheet.mainContainer}>
          {/* Poster */}
          <Image
            source={images.travelworthy_logo}
            style={styleSheet.posterLogo}
          />
          <Text style={styleSheet.posterText}>
            {'Sign up to receive our newsletter for 10% off!'}
          </Text>
        </View>
      </ScreenContainer>
    );
  } // End of render()
} // End of class

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //
const styleSheet = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  // Poster
  posterContainer: {
    borderColor: '#ffb87a',
    borderWidth: 3,
    justifyContent: 'center',
    top: '20%'
  },
  posterLogo: {
    width: horizontalModerateScale(230),
    height: verticalModerateScale(180),
    resizeMode: 'cover'
  },
  posterText: {
    backgroundColor: '#ffb87a',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    width: horizontalModerateScale(230),
    paddingVertical: space.vm2
  }
}); // End of styles
// End of file
