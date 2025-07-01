/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import { HomeProps } from '../screens/HomeScreen';
// import { MovieDetailsProps } from "../screens/movie/MovieDetailsScreen";
// import { ProfileProps } from "../screens/practice/ProfileScreen";
import { SimpleWebviewProps } from '../screens/SimpleWebViewScreen';
import { TutorialProps } from '../screens/practice/TutorialScreen';

/**
 * Used to assign which types (Props) the route will have access to?
 */
export type StackParamList = {
  Car: undefined; // this is a route correct?
  Home: HomeProps;
  Info: undefined;
  Movie: undefined;
  // MovieDetails: MovieDetailsProps;
  Practice: undefined;
  // Profile: ProfileProps;
  SimpleWebView: SimpleWebviewProps;
  Tutorial: TutorialProps;
}; // End of type StackParamList
// End of file
