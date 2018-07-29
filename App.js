/**
 * Castler App
 * https://github.com/dominicrico/castler-app
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './reducer';

import Header from './components/Header'
import CastleList from './components/CastleList'
import Start from './components/Start'
import CastleDetail from './components/CastleDetail';
// import Profile from './components/CastleList';

const client = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Tabs = createTabNavigator({
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
      backgroundColor: '#92B4CB',
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
    headerRight: <Text>Search</Text>,
    headerBackTitle: null,
  }
})

type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Stack />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    backgroundColor: 'green'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})
