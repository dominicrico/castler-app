import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux'

import { listCastles } from '../../reducer'

const width = Dimensions.get('window').width

type Props = {}

class CastleList extends Component<Props> {
  constructor(props) {
    super()
    this.state = {
      castles: []
    }
  }

  static navigationOptions = {
    title: 'Castles',
    headerLeft: <Text>Menu</Text>
  };

  componentDidMount() {
    this.props.listCastles()
  }

  static getDerivedStateFromProps(props, state) {
    const { castles } = props
    console.log(castles)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return state.castles = ds.cloneWithRows(castles)
  }

  renderItem = (item) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        return this.props.navigation.navigate('Detail', { _id: item._id, name: item.name })
      }}
    >
      {(item.images[0]) ?
        <Image resizeMode="cover" source={{uri: 'http://localhost:8080/castles/image/' + item.images[0]._id}} style={{ width: width / 2, height: width / 2 }} />
        : null
      }
      <View style={styles.card_footer}>
        <Text style={styles.text_white}>{item.name}</Text>
        <Text style={styles.text_grey}>{item.location.country}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View>
        <View style={styles.listHeader}>
          <Text style={styles.hint}>{`Select to view\nfull details`}</Text>
        </View>
        <ListView
          contentContainerStyle={styles.container}
          dataSource={this.state.castles}
          keyExtractor={(item) => item._id }
          renderRow={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: (width / 2) - 15,
    height: (width / 2) + 25 ,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: 'red',
    overflow: 'hidden'
  },
  card_footer: {
    marginTop: 'auto',
    height: 60,
    justifyContent: 'center',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#272E36',
    paddingHorizontal: 12
  },
  text_white: {
    color: '#fff',
    fontWeight: 'bold'
  },
  text_grey: {
    color: '#555A5C',
    fontWeight: 'bold',
    fontSize: 12
  },
  listHeader: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92B4CB'
  },
  hint: {
    textAlign: 'center'
  }
})

const mapStateToProps = state => {
  let storedCastles = state.castles.map(castle => ({ key: castle.id, ...castle }))
  return {
    castles: storedCastles
  }
}

const mapDispatchToProps = {
  listCastles
}

export default connect(mapStateToProps, mapDispatchToProps)(CastleList)
