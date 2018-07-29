/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

type Props = {}

export default class Header extends Component<Props> {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.column}>
          <Text>Castler</Text>
        </View>
        <View style={styles.column}>
          <Text style={{alignSelf: 'flex-end'}}>Menu</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 64,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
})
