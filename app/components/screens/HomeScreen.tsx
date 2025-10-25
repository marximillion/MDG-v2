/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import Button from '../common/Button';
import { Component, ReactNode } from 'react';
import { RouteProp } from '@react-navigation/native';
import ScreenContainer from '../common/ScreenContainer';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Home'>;
  route: RouteProp<StackParamList, 'Home'>;
}

export interface HomeProps {
  colorScheme?: string;
}

/**
 * State
 */
interface State {}

export default class HomeScreen extends Component<Props, State> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('HomeScreen::constructor');

    super(props);

    this.state = {};
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('HomeScreen::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('HomeScreen::componentWillUnmount');
  } // End of componentWillMount()

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigation: Info
   * - Navigate to info screen
   */
  private navigateInfo = () => {
    console.log('HomeScreen::navigateInfo');
    const { navigation } = this.props;
    navigation.navigate('Info');
  }; // End of navigateInfo()

  /**
   * Navigation: Practice
   * - Navigate to practice screen
   */
  private navigatePractice = () => {
    console.log('HomeScreen::navigatePractice');
    const { navigation } = this.props;
    navigation.navigate('Practice');
  }; // End of navigatePractice()

  /**
   * Navigation: Movie
   * - Navigate to movie screen
   */
  private navigateMovie = () => {
    console.log('HomeScreen::navigateMovie');
    const { navigation } = this.props;
    navigation.navigate('Movie');
  }; // End of navigateMovie()

  // ======================================================================= //
  // ===================== <<<<< Render Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Render: Home Screen
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    console.log('HomeScreen::render');
    return (
      <ScreenContainer withImageBackground={true}>
        <Button
          styleText={'sm'}
          title={'WELCOME'}
          type={'primary'}
          onPress={this.navigateInfo}
        />
        <Button
          styleText={'std'}
          title={'Practice Screen'}
          type={'wide'}
          onPress={this.navigatePractice}
        />
        <Button
          styleText={'lg'}
          title={'Movie Screen'}
          type={'text-only'}
          onPress={this.navigateMovie}
        />
      </ScreenContainer>
    );
  } // End of render()
} // End of class
