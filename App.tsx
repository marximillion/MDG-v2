/**
 * Copyright (c) MDG 2025.
 */

/**
 * Imports
 */
import { Component, ReactNode } from 'react';
import { NavigableAppContainer } from './app/navigation/NavigableAppContainer';
import React from 'react';
import { StatusBar } from 'react-native';

/**
 * Props
 */
interface Props {}

/**
 * State
 */
interface State {}

/**
 * App Screen
 */
export default class App extends Component<Props, State> {
  /**
   * Constructor
   * @param props
   */
  constructor(props: Props) {
    super(props);

    console.log('App::Constructor');
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount() {
    console.log('App::componentDidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount() {
    console.log('App::componentWillUnmount');
  } // End of componentWillUnmount()

  // ===================================================================== //
  // ==================== <<<<< Render Methods >>>>> ===================== //
  // ===================================================================== //

  /**
   * Render: Main
   * @returns ReactNode
   */
  public render(): ReactNode {
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'black'}></StatusBar>
        <NavigableAppContainer />
      </>
    );
  } // End of render()
} // End of class()
// End of file
