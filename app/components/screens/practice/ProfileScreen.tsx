/**
 * Imports
 */
import Button from '../../common/Button';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';
import React, { Component, ReactNode } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Profile'>;
  route: RouteProp<StackParamList, 'Profile'>;
}

export interface ProfileProps {
  details: {
    firstName: string;
    lastName: string;
    age: number | null;
  };
}

/**
 * State
 */
interface State {}

export default class ProfileScreen extends Component<Props, State> {
  /**
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('ProfileScreen::constructor');

    super(props);

    // initialize state
    this.state = {};
  } // End of contructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('ProfileScreen::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('ProfileScreen::componentWillUnmount');
  } // End of componentWillMount()

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigation: Tutorial
   * - Navigate to tutorial screen
   * TODO: WIP
   */
  private navigateTutorial = () => {
    console.log('ProfileScreen::navigateTutorial');
    const { details } = this.props.route.params;
    this.props.navigation.navigate('Tutorial', { details });
  }; // End of navigateTutorial()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  public render(): ReactNode {
    console.log('ProfileScreen::render');
    const { details } = this.props.route.params;
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <SafeAreaView style={styles.safeAreaContainer}>
          <KeyboardAvoidingView style={styles.mainContainer}>
            <Text style={styles.mainText}>
              {`Nice to meet you ${details.firstName} ${details.lastName}\n`}
              {`You are ${details.age} years old!\n`}
              {details.age && details.age > 24
                ? 'You are older than me'
                : 'You are younger than me'}
            </Text>
            {/* Tutorial Button */}
            <Button
              title={'Tutorial Screen'}
              type={'wide'}
              onPress={this.navigateTutorial}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  } // End of render()
} // End of class

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%'
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 20,
    backgroundColor: '#87ceeb'
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    margin: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5464d1',
    borderColor: 'black',
    borderRadius: 10, // Circular button shape
    borderWidth: 1,
    elevation: 5,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#005',
    shadowOffset: {
      height: 2,
      width: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
// End of file
