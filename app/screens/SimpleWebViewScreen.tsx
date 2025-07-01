/**
 * Imports
 */

import { GlobalStyles } from '../styles/GlobalStyles';
import React, { Component, ReactNode } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../navigation/StackParamList';
import WebView, { WebViewNavigation } from 'react-native-webview';

/**
 * Props
 */
export interface Props {
  route: RouteProp<StackParamList, 'SimpleWebView'>;
  navigation: StackNavigationProp<StackParamList, 'SimpleWebView'>;
}
export interface SimpleWebviewProps {
  url: string | undefined;
}

/**
 * State
 */
interface State {
  busy: boolean;
}

/**
 * Root Render of the Application
 */
export default class SimpleWebViewScreen extends Component<Props, State> {
  /**
   * Members
   */
  private readonly url: string | undefined;

  /**
   * Constructor
   * @param props
   */
  constructor(props: Props) {
    console.log('SipleWebView::Constructor');

    super(props);

    // initialize state
    this.state = {
      busy: true
    };

    this.url = this.props.route?.params?.url ?? '';
  } // End of constructor()

  /**
   * On Mount
   */
  public componentDidMount(): void {
    console.log('SimpleWebView::OnMount');
  } // End of componentDidMount()

  /**
   * Un Mount
   */
  public componentWillUnmount(): void {
    console.log('SimpleWebView:UnMount');
  } // End of componentWillUnmount()

  // ======================================================================= //
  // ===================== <<<<< Action Methods >>>>> ====================== //
  // ======================================================================= //

  /**
   * Action: Navigation State Change
   * - Once the page stops loading, make sure to stop our spinner
   *
   * @param {WebViewNavigation} event
   */
  private onNavigationStateChange = (event: WebViewNavigation): void => {
    if (!event.loading) {
      // this.setState( { busy: false } )
    }
  }; // End of onNavigationStateChange

  // ===================================================================== //
  // ================== <<<<< Navigation Methods >>>>> =================== //
  // ===================================================================== //

  /**
   * Navigator: Previous screen on stack
   * - Basic back button since no data is changed on this child screen that is used by the parent screen
   */
  private navigateBack = () => {
    this.props.navigation?.goBack();
  }; // End of navigateBack()

  // ======================================================================= //
  // ===================== <<<<< Render Methods >>>>> ====================== //
  // ======================================================================= //

  public render(): ReactNode {
    const { url } = this.props.route.params;
    return (
      <>
        <StatusBar backgroundColor={'transparent'} />
        <View style={styles.actionBarContainer}>
          <TouchableOpacity style={styles.button} onPress={this.navigateBack}>
            <Text style={styles.buttonText}>{'< BACK'}</Text>
          </TouchableOpacity>
          <Text style={GlobalStyles.standardText}>{url}</Text>
        </View>

        <WebView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onNavigationStateChange={this.onNavigationStateChange}
          onLoadStart={() => {
            this.setState({ busy: true });
          }}
          onError={() => {
            this.setState({ busy: false });
          }}
          source={{ uri: this.url ? this.url : '' }}
          mixedContentMode={'always'}
          cacheEnabled={false}
          incognito
        />
      </>
    );
  } // End of render()
} // End of class

// ======================================================================= //
// ===================== <<<<< Render Methods >>>>> ====================== //
// ======================================================================= //

const styles = StyleSheet.create({
  actionBarContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    width: '100%'
  },
  button: {
    alignSelf: 'flex-start',
    paddingRight: 15
  },
  buttonText: {
    color: 'pink',
    fontSize: 40,
    fontWeight: 'bold'
  }
});
// End of file
