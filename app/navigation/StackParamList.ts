/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import { HomeProps } from '../components/screens/HomeScreen';
import { MovieDetailsProps } from '../components/screens/movie/MovieDetailsScreen';
import { ProfileProps } from '../components/screens/practice/ProfileScreen';
import { SimpleWebviewProps } from '../components/screens/SimpleWebViewScreen';
import { TutorialProps } from '../components/screens/practice/TutorialScreen';

/**
 * Used to assign which types (Props) the route will have access to?
 */
export type StackParamList = {
  Car: undefined; // this is a route correct?
  Game: undefined;
  GameSplash: undefined;
  Home: HomeProps;
  Info: undefined;
  Movie: undefined;
  MovieDetails: MovieDetailsProps;
  Practice: undefined;
  Profile: ProfileProps;
  SimpleWebView: SimpleWebviewProps;
  Tutorial: TutorialProps;
}; // End of type StackParamList
// End of file
