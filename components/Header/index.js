/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Feather'

type Props = {}

export default class Header extends Component<Props> {
  constructor(props) {
    super()

    console.log('props', props)

    this.state = {
      label: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { descriptors } = props
    const keys = Object.keys(descriptors)
    const title = descriptors[keys[props.index || 0]].options.title || 'Castler'
    let changed = false

    if (state.label !== title) {
      changed = true
      state.label = descriptors[keys[props.index || 0]].options.title || 'Castler'
    }

    return (changed) ? state : null
  }

  goBack = () => this.props.navigation.pop()

  render() {
    return (
      <View style={[styles.container, this.props.navigationOptions.headerStyle]}>
        <View style={styles.column}>
          {this.props.index > 0 ? (
            <TouchableOpacity style={styles.headerLeft} onPress={() => this.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.headerLeft}>
              <Icon name="menu" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.column, styles.columnMiddle]}>
          <Text style={styles.headerTitle}>{this.state.label}</Text>
        </View>
        <View style={[styles.column, styles.columnRight]}>
          <TouchableOpacity style={styles.headerRight}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 0,
    height: 64,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  headerTitle: {
    color: '#fff'
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  columnMiddle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRight: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnRight: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headerLeft: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
