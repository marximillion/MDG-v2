/**
 * Imports
 */
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import Button from '../components/Button';
import { GlobalStyles } from '../../styles/GlobalStyles';
import React, { Component, ReactNode } from 'react';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/StackParamList';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Info'>;
  route: RouteProp<StackParamList, 'Info'>;
}

/**
 * State
 */
interface State {
  enabled: boolean;
  statusBarColoriOS: StatusBarStyle;
  statusBarColorAndroid: string;
  details: {
    firstName: string;
    lastName: string;
    age: number | null;
  };
}

/**
 * Info Screen
 */
export default class InfoScreen extends Component<Props, State> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: Props) {
    super(props);

    // initialize state
    this.state = {
      enabled: false,
      statusBarColoriOS: 'dark-content',
      statusBarColorAndroid: 'transparent',
      details: {
        firstName: '',
        lastName: '',
        age: null
      }
    };
  } // End of constructor()

  // ===================================================================== //
  // ==================== <<<<< Action Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Action: Toggle
   * Toggle Status Bar from light to dark mode
   */
  private statusBarToggle = () => {
    this.setState((prevState) => ({
      enabled: !prevState.enabled,
      statusBarColoriOS:
        prevState.statusBarColoriOS === 'dark-content'
          ? 'light-content'
          : 'dark-content',
      statusBarColorAndroid:
        prevState.statusBarColorAndroid === 'transparent'
          ? 'black'
          : 'transparent'
    }));
  }; // End of statusBarToggle()

  /**
   * Action: Type
   * update the text displayed on text input box
   */
  private handleChangeText(value: string, identifier: string) {
    // trims the value for leading, trailing whitespaces, and any non-letter character except for '
    const trimmedValue = value.trim().replace(/[^a-zA-Z\s']/g, '');
    // if length of string is greater than 20, it will get the characters for index 0 to 20
    // otherwise, it will return the entire string
    const finalValue =
      trimmedValue.length > 20 ? trimmedValue.substring(0, 20) : trimmedValue;
    switch (identifier) {
      case 'firstName':
        this.setState({
          details: {
            ...this.state.details, // creates a new object, copying the properties of
            firstName: finalValue.trim()
          }
        });
        break;
      case 'lastName':
        this.setState({
          details: {
            ...this.state.details, // creates a new object, copying the properties of
            lastName: finalValue.trim()
          }
        });
        break;
    }
  } // End of handleChangeText()

  /**
   * Action: Type
   * update the text displayed on numeric input box
   */
  private handleChangeNumber(value: string) {
    // Convert string value to number
    const intValue = parseInt(value);

    // Check if the input value is empty or a valid number with at most 3 digits and less than 117 (oldest person
    // in the world)
    if (
      value === '' ||
      (!isNaN(intValue) && /^[0-9]{1,3}$/.test(value) && intValue <= 117)
    ) {
      this.setState({
        details: {
          // nested object within the state
          ...this.state.details, // spreads the properties of current details state object
          age: intValue // assign null if empty, if not assign the value
        }
      });
    } else {
      Alert.alert(
        `Stop lying you're not older than the oldest person in the world`
      );
    }
    console.log(intValue);
  } // End of handleChangeNumber()

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigation: Profile
   * - Navigate to profile screen
   */
  private navigateProfile = () => {
    const { navigation } = this.props;
    const { details } = this.state;
    const { firstName, lastName, age } = details;
    if (!firstName || !lastName || !age) {
      Alert.alert('All fields are required');
    } else {
      navigation.navigate('Profile', { details });
    }
  }; // End of navigateProfile()

  /**
   * Navigation: SimpleWebView
   * - Navigate to simple webview screen
   */
  private navigateSimpleWebView = (url: string) => {
    const { navigation } = this.props;
    navigation.navigate('SimpleWebView', { url });
  }; // End of navigateSimpleWebView()

  /**
   * Navigation: Back
   * - Navigate back to the previous screen
   */
  private navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }; // End of navigateBack()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: InfoScreen
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    const { enabled, statusBarColoriOS, statusBarColorAndroid, details } =
      this.state;
    return (
      // TODO: Refactor to use <ScreenContainer>
      <>
        <SafeAreaView style={GlobalStyles.safeAreaContainer}>
          <StatusBar
            barStyle={statusBarColoriOS}
            backgroundColor={statusBarColorAndroid}
          />

          {/* Header */}
          <View style={styles.headerContainer}>
            <Button
              title={'<BACK'}
              type={'text-only'}
              onPress={this.navigateBack}
            />
          </View>

          {/* Main Content */}
          <ScrollView
            style={GlobalStyles.scrollViewContainer}
            contentContainerStyle={GlobalStyles.scrollViewContentContainer}
            showsVerticalScrollIndicator={false}>
            {/* Screen Title */}
            <Text style={GlobalStyles.titleText}>{'INFORMATION SCREEN'}</Text>

            {/* First Name Input Field */}
            <Text style={styles.mainText}>{'First Name:'}</Text>
            <TextInput
              style={[styles.inputBox, { color: 'rgba(255, 255, 255, 0.5)' }]}
              onChangeText={(firstName) =>
                this.handleChangeText(firstName, 'firstName')
              }
              value={details.firstName}
              placeholder={'What is your first name?'}
              placeholderTextColor={'black'}
            />

            {/* Last Name Input Field */}
            <Text style={styles.mainText}>{'Last Name:'}</Text>
            <TextInput
              style={[styles.inputBox, { color: 'black' }]}
              onChangeText={(lastName) =>
                this.handleChangeText(lastName, 'lastName')
              }
              value={details.lastName}
              placeholder={'What is your last name?'}
              placeholderTextColor={'white'}
            />

            {/* Age Input Field */}
            <Text style={styles.mainText}>{'Age:'}</Text>
            <TextInput
              style={[styles.inputBox, { color: 'white' }]}
              onChangeText={(age) => this.handleChangeNumber(age)}
              value={details.age ? details.age.toString() : ''}
              placeholder={'How old are you?'}
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              keyboardType={'numeric'}
            />

            {/* Status Bar Switch */}
            <Switch
              trackColor={{ false: 'pink', true: '#81b0ff' }}
              thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor={'pink'}
              onValueChange={this.statusBarToggle}
              value={enabled}
            />

            {/* Submit Button */}
            <Button
              title={'SUBMIT'}
              type={'wide'}
              onPress={this.navigateProfile}
            />

            {/* Contact Methods Container */}
            <View style={styles.contactContainer}>
              {/* Phone # Button */}
              <Button
                title={'Call Me'}
                type={'primary'}
                onPress={() => Linking.openURL('tel:+15875875875')}
              />

              {/* SMS Button */}
              <Button
                title={'Text Me'}
                type={'primary'}
                onPress={() => Linking.openURL('sms:+15875875875')}
              />

              {/* Email Button */}
              <Button
                title={'Email Me'}
                type={'primary'}
                onPress={() =>
                  Linking.openURL('mailto:mdguzman@homewoodhealth.com')
                }
              />
            </View>

            {/* Browser Button */}
            <Button
              title={'Visit Homewood - Browser'}
              type={'wide'}
              onPress={() => Linking.openURL('https://homewoodhealth.com/')}
            />

            {/* WebView Button */}
            <Button
              title={'Visit Homewood - WebView'}
              type={'wide'}
              onPress={() =>
                this.navigateSimpleWebView('https://homewoodhealth.com')
              }
            />

            {/* Bad Link Button */}
            <Button
              title={'Tap to redeem $1 million dollars'}
              type={'wide'}
              onPress={() => Linking.openURL('https://www.pixar.com/404')}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } // End of render()
} // End of class()

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styles = StyleSheet.create({
  headerContainer: {
    alignSelf: 'flex-start'
  },
  contactContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  mainText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left'
  },
  inputBox: {
    height: 50,
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(111, 122, 255, 0.5)',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16
  }
}); // End of styles
// End of file
