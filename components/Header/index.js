/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Text, View, TouchableOpacity, TextInput} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Feather'
import _ from 'lodash'
import { connect } from 'react-redux'

import { findCastles, listCastles } from '../../reducer'

type Props = {}

class Header extends Component<Props> {
  constructor(props) {
    super()

    this.onChangeTextDelayed = _.debounce(this.onChangeText, 800);

    this.state = {
      label: null,
      search: false,
      term: null
    }

    this.searchInput = null
  }

  static getDerivedStateFromProps(props, state) {
    const { descriptors } = props
    console.log(descriptors)
    const keys = Object.keys(descriptors)
    const title = descriptors[keys[props.index || 0]].options.title || 'Castler'
    let changed = false

    if (state.label !== title) {
      changed = true
      state.label = descriptors[keys[props.index || 0]].options.title || 'Castler'
    }

    return (changed) ? state : null
  }

  onChangeText = (text) => {
    if (this.props.index > 0) this.props.navigation.popToTop()
    if (text && text.length) this.props.findCastles(text)
    else this.props.listCastles(1)
  }

  onHideSearch = () => {
    if (this.searchInput) {
      this.searchInput.blur()
      this.searchInput.clear()
      this.searchInput = null
    }
    this.setState({search: !this.state.search})
    this.props.listCastles(1)
  }

  showSearch = () => {
    if (this.searchInput) this.searchInput.focus()
    this.setState({search: !this.state.search})
  }

  setRef = element => {
    if (element && !this.searchInput) {
      this.searchInput = element;
      element.focus()
    }
  }

  goBack = () => this.props.navigation.pop()

  render() {
    return (
      <View style={[styles.container, this.props.navigationOptions.headerStyle]}>
        <View style={styles.column}>
          {this.props.index > 0 ? (
            <TouchableOpacity style={styles.headerLeft} onPress={() => this.goBack()}>
              <Icon name="chevron-left" size={22} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.headerLeft}>
              <Icon name="menu" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.column, styles.columnMiddle]}>
          {this.state.search ? (
            <TextInput
              ref={this.setRef}
              style={styles.search}
              onChangeText={this.onChangeTextDelayed}
              value={this.state.text}
              placeholder="Type to search..."
              placeholderColor="#AFC6CD"
              selectionColor="#fff"
            />
          ) : (
            <Text style={styles.headerTitle}>{this.state.label}</Text>
          )}
        </View>
        <View style={[styles.column, styles.columnRight]}>
          {this.state.search ? (
            <TouchableOpacity style={styles.headerRight} onPress={() => this.onHideSearch()}>
              <Icon name="x" size={22} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.headerRight} onPress={() => this.showSearch()}>
              <Icon name="search" size={22} color="#fff" />
            </TouchableOpacity>
          )}
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
    paddingHorizontal: 12
  },
  headerTitle: {
    color: '#fff',
    top: 3,
    fontSize: 18,
    fontFamily: 'Biko-Black'
  },
  column: {
    flex: 1,
    alignItems: 'flex-start'
  },
  columnMiddle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRight: {
    paddingHorizontal: 2,
    alignItems: 'flex-end'
  },
  columnRight: {
    alignItems: 'flex-end'
  },
  headerLeft: {
    paddingHorizontal: 2,
    alignItems: 'flex-start'
  },
  search: {
    height: 20,
    width: '100%',
    borderColor: 'transparent',
    borderBottomColor: 'white',
    borderWidth: 2,
    color: 'white',
    fontFamily: 'Biko'
  }
})

const mapDispatchToProps = {
  findCastles,
  listCastles,
}

export default connect(null, mapDispatchToProps)(Header)
