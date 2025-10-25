/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import {CarInputFunctional} from './CarInputFunctional';
import { Component, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../../navigation/StackParamList';
import Button from '../../common/Button';
import { images } from '../../../assets/images';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Tutorial'>;
  route: RouteProp<StackParamList, 'Tutorial'>;
}

export interface TutorialProps {
  details: {
    firstName: string;
    lastName: string;
    age: number | null;
  };
}

/**
 * State
 */
interface State {
  numOfPress: number | null;
  busy: boolean; // for activity indicator - TODO: Implement activity indicator
  color: string;
}

/**
 * App Screen
 */
export default class TutorialScreen extends Component<Props, State> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: Props) {
    super(props);

    // initialize state
    this.state = {
      numOfPress: this.props.route.params.details.age ?? 0, // testing prop passing - should be set to the age entered from Tutorial
      busy: true,
      color: '#FFC0CB'
    };

    console.log('TutorialScreen::Constructor::Firing');
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount() {
    console.log('TutorialScreen::On Mount::Firing');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount() {
    console.log('TutorialScreen::Un Mount::Firing');
  } // End of componentWillUnmount()

  // ===================================================================== //
  // ==================== <<<<< Action Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Action:Press
   * Reset App Screen Background Color and number of press counter
   */
  private onPressReset = () => {
    const { age } = this.props.route.params.details;

    // reset ALL states
    this.setState({ numOfPress: age, color: '#FFC0CB', busy: true });
    console.log(`Button Press and Background Color RESET`);
    Alert.alert(`Button Press and Background Color has been reset`);
  }; // End of onPressReset()

  /**
   * Action:Press
   * Change App Screen Background Color to a random color
   */
  private onPressColor = () => {
    // generate a random color
    const randColor = () => {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()}`;
    };

    // update color state
    this.setState({ color: randColor() });
  }; // End of onPressColor()

  /**
   * Action:Press
   * Increase press value displayed on screen by 1
   */
  private onPressAdd = () => {
    // extract numOfPress variable from state
    const { numOfPress } = this.state;

    if (numOfPress) {
      // update numOfPress state
      this.setState({ numOfPress: numOfPress + 1 });
    }

    this.setState({ busy: false });
  }; // End of onPressAdd()

  /**
   * Action:Press
   * Decrease press value displayed on screen by 1
   */
  private onPressSubtract = () => {
    // extract numOfPress variable from state
    const { numOfPress } = this.state;

    if (numOfPress) {
      // update numOfPress state
      this.setState({ numOfPress: numOfPress + 1 });
    }

    this.setState({ busy: false });
  }; // End of onPressSubtract()

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigation: Car
   * - Navigate to car screen
   */
  private navigateCar = () => {
    this.props.navigation.navigate('Car');
  }; // End of navigateCar()

  /**
   * Navigation: Info
   * - Navigate to info screen
   */
  private navigateInfo = () => {
    this.props.navigation.navigate('Info');
  }; // End of navigateInfo()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: TutorialScreen
   * @returns ReactNode
   */
  public render(): ReactNode {
    // extract variables from state
    const { numOfPress, color } = this.state;

    /**
     * destructuring
     * extract the props from the specific route ("Tutorial") to the given variable names in the {...}
     */
    const { details } = this.props.route.params;

    // set image variable
    // const image = require('../assets/clown.png');

    return (
      <>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
        <SafeAreaView style={styleSheet.safeAreaContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styleSheet.innerContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styleSheet.scrollViewContainer}
              contentContainerStyle={styleSheet.scrollViewContentContainer}>
              <View
                style={[styleSheet.mainContainer, { backgroundColor: color }]}>
                <Text style={styleSheet.titleText}>
                  {details.firstName} {details.lastName} {`\n`}
                  {'Tutorial Screen'}
                </Text>
                <Image source={images.clown} />
                <View style={styleSheet.innerContainer}>
                  {/** *********** Subtract 1 button ************** */}
                  <TouchableOpacity
                    style={[styleSheet.button, { backgroundColor: 'red' }]}
                    onPress={this.onPressSubtract}>
                    <Text style={styleSheet.buttonText}>{'Subtract 1'}</Text>
                  </TouchableOpacity>
                  {/** ************* Add 1 button ***************** */}
                  <TouchableOpacity
                    style={[styleSheet.button, { backgroundColor: 'green' }]}
                    onPress={this.onPressAdd}>
                    <Text style={styleSheet.buttonText}>{'Add 1'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styleSheet.mainText}>
                  {'Age: '}
                  {numOfPress}
                </Text>
                <View style={styleSheet.innerContainer}>
                  {/** *********** Change Color button ************ */}
                  <TouchableOpacity
                    style={[styleSheet.button, { backgroundColor: 'orange' }]}
                    onPress={this.onPressColor}>
                    <Text style={[styleSheet.buttonText, { color }]}>
                      {'Change Color'}
                    </Text>
                  </TouchableOpacity>
                  {/** ************* Reset button ***************** */}
                  <TouchableOpacity
                    style={[styleSheet.button]}
                    onPress={this.onPressReset}>
                    <Text style={styleSheet.buttonText}>{' Reset '}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styleSheet.mainText}>
                  {'Current Color is: '}
                  {color}
                </Text>
                <Text style={styleSheet.titleText}>{'Scroll me plz'}</Text>
                {/* TODO: have all the navigation in a navigation methods */}
                {/* <CarInputFunctional driver={`${firstName}`} /> */}
                <View style={styleSheet.innerContainer}>
                  {/* Car Screen Button */}
                  <Button
                    title={'Car Screen'}
                    type={'primary'}
                    onPress={this.navigateCar}
                  />

                  {/** ***** Navigate to Info Screen button ******* */}
                  <Button
                    title={'Info Screen'}
                    type={'primary'}
                    onPress={this.navigateInfo}
                  />
                </View>
                {/* <TouchableOpacity
                  style={[styleSheet.button]}
                  onPress={() =>
                    this.props.navigation.navigate('Practice', {})
                  }>
                  <Text style={styleSheet.buttonText}>
                    {' '}
                    Go to Practice Screen{' '}
                  </Text>
                </TouchableOpacity> */}
                <Image source={images.clown} />
                <Image source={images.clown} />
                <Image source={images.clown} />
                <Image source={images.clown} />
                <Image source={images.clown} />
                <Image source={images.clown} />
                <Image source={images.clown} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  } // End of render()
} // End of class()

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styleSheet = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'plum',
    flex: 1
  },
  scrollViewContainer: {
    backgroundColor: 'purple'
  },
  scrollViewContentContainer: {
    backgroundColor: 'orange'
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderColor: 'red',
    marginBottom: 20,
    flex: 1
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  titleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    justifyContent: 'center',
    marginVertical: 30
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5464d1',
    borderColor: 'black',
    borderRadius: 50, // Circular button shape
    borderWidth: 2,
    elevation: 5,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '45%'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center'
  },
  mainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
}); // End of styles
// End of file
