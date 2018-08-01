/**
 * Castler App
 * https://github.com/dominicrico/castler-app
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {SafeAreaView, StatusBar, Platform, View} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'


import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './reducer';
import init from './utils/StylesheetBuild';

init()

import Header from './components/Header'
import CastleList from './components/CastleList'
import Start from './components/Start'
import CastleDetail from './components/CastleDetail';

const client = axios.create({
  baseURL: 'https://api.castler.app',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Tabs = createMaterialTopTabNavigator({
  Settings: {
    screen: Start
  },
  Profile: {
    screen: Start
  }
})

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Castler'
    }
  },
  Detail: {
    screen: CastleDetail
  },
  CastleList: {
    screen: CastleList
  }
},{
  initialRouteName: 'CastleList',
  navigationOptions: {
    headerStyle: {
      backgroundColor: EStyleSheet.value('$primaryColor'),
      borderColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
          height: 0
      },
      elevation: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    header: (props) => <Header {...props} />
  }
})

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Stack />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$primaryColor',
    height: '100%'
  },
  content: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#4AA4C2"
  }
})
