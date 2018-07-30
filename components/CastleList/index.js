import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';

import { listCastles } from '../../reducer'

const width = Dimensions.get('window').width
let _data = []

type Props = {}

class CastleList extends Component<Props> {
  constructor(props) {
    super()

    const castles = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      castles: castles.cloneWithRows(['row 1', 'row 2']),
      page: 1
    }
  }


  static navigationOptions = {
    title: 'Castles'
  };

  static getDerivedStateFromProps(props, state) {
    const { castles, page, pages, loading } = props

    _data = _data.concat(castles)

    state.loading = loading
    state.castles = state.castles.cloneWithRows(_data)

    return state
  }

  componentDidMount() {
    this.props.listCastles(1)
  }

  _rowHasChanged = (prevRow, nextRow) => {
    return prevRow !== nextRow
  }

  getNextCastles = () => {
    this.props.listCastles(this.props.page + 1)
  }

  renderItem = (item) => {
    return (
      <View style={styles.itemShadow}>
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
            <View style={styles.footer_left}>
              <Text style={styles.text_white}>{item.name}</Text>
              <Text style={styles.text_grey}>{item.location.country}</Text>
            </View>
            <View style={styles.footer_right}>
              <Icon style={styles.iconMore} name="more-vertical" size={20} color="#2980b9" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.hint}>{`Select to view\nfull details`}</Text>
        </View>
        <View style={styles.overlapping} />
        <View style={styles.container}>
          <ListView
            onEndReachedThreshold={0.7}
            contentContainerStyle={styles.listContainer}
            onEndReached={this.getNextCastles}
            dataSource={this.state.castles}
            keyExtractor={(item) => item._id}
            extraData={this.props.castles}
            initialListSize={8}
            pageSize={5}
            renderRow={this.renderItem}
            ListFooterComponent={() => {
              return ((this.props.loading) ? (<View style={styles.listFooter}><ActivityIndicator size="small"/></View>) : null)
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  outerContainer: {
    backgroundColor: '#28272d'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100% - 104'
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listFooter: {
    justifyContent: 'center',
    flex: 1
  },
  overlapping: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 80,
    backgroundColor: '#2980b9'
  },
  footer_left: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  footer_right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconMore: {
    alignSelf: 'flex-end'
  },
  itemShadow: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    display: 'flex',
    width: (width / 2) - 5
  },
  item: {
    flex: 1,
    height: (width / 2) + 25 ,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: 'red',
    overflow: 'hidden',
    display: 'flex'
  },
  card_footer: {
    marginTop: 'auto',
    height: 60,
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#272E36',
    paddingHorizontal: 12,
    flexDirection: 'row',
    width: '100%'
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9'
  },
  hint: {
    textAlign: 'center',
    color: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    castles: state.castles,
    page: parseInt(state.page),
    pages: state.pages,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  listCastles
}

export default connect(mapStateToProps, mapDispatchToProps)(CastleList)
