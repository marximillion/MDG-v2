/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import { Component, ReactNode } from 'react';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { images } from '../../../assets/images';
import { RouteProp } from '@react-navigation/native';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
  ImageBackground
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../navigation/StackParamList';

enum cars {
  CSX = 'Grey Eagle',
  CSX_TYPE_S = 'Sonic the Hedgehog',
  CRV = 'Clifford the Big Red Dawg',
  ODYSSEY = 'Migi Japayuki'
}

const carsAvailable = [
  'Grey Eagle',
  'Sonic the Hedgehog',
  'Clifford the Big Red Dawg',
  'Migi Japayuki'
];

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Car'>;
  route: RouteProp<StackParamList, 'Car'>;
}

/**
 * State
 */
interface State {}

export default class CarScreen extends Component<Props, State> {
  /**
   * Members
   */

  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    console.log('CarScreen::constructor');

    super(props);

    // initialize state
    this.state = {};
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('CarScreen::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('CarScreen::componentWillUnmount');
  } // End of componentWillMount()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: Cars
   */
  private renderCars = ({ item }: ListRenderItemInfo<string>) => {
    let carImage;
    switch (item) {
      // TODO: Get the missing assets
      case cars.CSX:
        // carImage = images.csx;
        // break;
      case cars.CSX_TYPE_S:
        // carImage = images.csx_type_s;
        // break;
      case cars.CRV:
        // carImage = images.crv;
        // break;
      case cars.ODYSSEY:
        // carImage = images.odyssey;
        // break;
      default:
        carImage = images.no_image;
    }

    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.carsBtn]}
        // TODO: Create CarDetails Screen
        // onPress={() => this.props.navigation.navigate('CarDetails', {selectedCar: item})}
        // onPress={() => navigation.navigate('CarDetails', {})}
        onPress={() => {}}
      >
        <ImageBackground
          style={styles.carImage}
          source={carImage}
          resizeMode={'contain'}
        />
        <Text style={GlobalStyles.standardText}>{item}</Text>
      </TouchableOpacity>
    );
  }; // End of renderCars()

  /**
   * Render: CarScreen
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    console.log('CarScreen::render');

    return (
      <SafeAreaView style={GlobalStyles.safeAreaContainer}>
        <View style={GlobalStyles.screenContainer}>
          <Text style={GlobalStyles.titleText}>{'Cars Owned'}</Text>
          <FlatList
            data={carsAvailable}
            renderItem={this.renderCars}
            showsVerticalScrollIndicator={false}
            style={GlobalStyles.flatListContainer}
            contentContainerStyle={GlobalStyles.flatListContentContainer}
          />
        </View>
      </SafeAreaView>
    );
  } // End of render()
} // End of class

// ===================================================================== //
// ====================== <<<<< StyleSheets >>>>> ====================== //
// ===================================================================== //

const styles = StyleSheet.create({
  carsBtn: {
    backgroundColor: 'pink',
    borderColor: 'blue',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: 300
  },
  carImage: {
    height: 300, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});
// End of file
