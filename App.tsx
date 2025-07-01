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

    console.log('Constructor::Firing');
  } // End of constructor()

  /**
   * on Mount
   */
  public componentDidMount() {
    console.log('On Mount::Firing');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount() {
    console.log('Un Mount::Firing');
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
