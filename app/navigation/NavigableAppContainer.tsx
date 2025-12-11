/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import CarScreen from '../components/screens/car/CarScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeScreen';
import InfoScreen from '../components/screens/practice/InfoScreen';
import MovieScreen from '../components/screens/movie/MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import PracticeScreen from '../components/screens/practice/PracticeScreen';
import ProfileScreen from '../components/screens/practice/ProfileScreen';
import SimpleWebViewScreen from '../components/screens/SimpleWebViewScreen';
import { StackParamList } from './StackParamList';
import TutorialScreen from '../components/screens/practice/TutorialScreen';
import GameScreen from '../components/screens/game/GameScreen';
import GameSplashScreen from '../components/screens/game/GameSplashScreen';

/**
 * @file NavigableAppContainer.tsx
 * @description This file defines the NavigableAppContainer component, which is used to manage navigation
 */

/**
 * Imports
 */

/**
 * Initialization
 */
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<StackParamList>();

/**
 * Main Container
 * Configure navigation routing and screen stack for the application
 */
export function NavigableAppContainer() {
  // const colorScheme = Appearance.getColorScheme() ?? 'light' ;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'GameSplash'}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          // initialParams={{colorScheme}}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'GameSplash'} component={GameSplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={'Game'} component={GameScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={'Info'} component={InfoScreen} />
        <Stack.Screen name={'Profile'} component={ProfileScreen} />
        <Stack.Screen
          name={'Tutorial'} // route name of this screen! = {"label for the type defined in StackParamList.ts (e.g. "Tutorial(name): TutorialProps(type)"}
          component={TutorialScreen} // component to render 'name' specified on the line above
          initialParams={{
            details: { firstName: 'Test', lastName: 'User', age: 35 }
          }}
          options={{ headerShown: false }} // additional options e.g. remove header
        />
        <Stack.Screen name={'Car'} component={CarScreen} />
        <Stack.Screen name={'Practice'} component={PracticeScreen} />
        <Stack.Screen name={'Movie'} component={MovieScreen} />
        <Stack.Screen name={'SimpleWebView'} component={SimpleWebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} // End of NavigableAppContainer()

/**
 * Navigation Bar
 * styling for the bottom tab navigation bar
 * TODO: Create Bottom Tab Navigator
 */
function NavigationBar() {} // End of NavigationBar()

/**
 * Tab Navigator
 * Navigation stack for the bottom tab
 * TODO: Implement this alongside NavigationBar()
 */
function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={'Tutorial'}
      screenOptions={{
        lazy: true
        // headerShown: false,
      }}
      // tabBar={renderTabBar}
    >
      <Tab.Screen name={'Tutorial'} component={TutorialScreen} />
      <Tab.Screen name={'Car'} component={CarScreen} />
      <Tab.Screen name={'Info'} component={InfoScreen} />
    </Tab.Navigator>
  );
} // End of TabNavigator()
