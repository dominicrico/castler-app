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

import { listCastles, findCastles } from '../../reducer'

const width = Dimensions.get('window').width
let _data = []

type Props = {}

class CastleList extends Component<Props> {
  constructor(props) {
    super()

    this.state = {
      castles: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      page: 1,
      totalPages: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { castles, results, page, pages, loading } = props

    if (page === 1) {
      _data = castles
    } else if (page > 1) {
      _data = _data.concat(castles)
    }

    state.page = page
    state.totalPages = pages
    state.loading = loading
    state.castles = state.castles.cloneWithRows(_data)

    return state
  }

  componentDidMount() {
    this.props.listCastles(1)
  }

  getNextCastles = () => {
    if (this.state.page < this.state.totalPages) {
      if (this.props.term) {
        this.props.findCastles(this.props.term, this.state.page + 1)
      } else {
        this.props.listCastles(this.state.page + 1)
      }
    }
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
            <Image resizeMode="cover" source={{uri: 'https://api.castler.app/castles/image/' + item.images[0]._id}} style={{ width: width / 2.15, height: width / 1.85 }} />
            : (<View style={styles.no_image}>
              <Image resizeMode="contain" source={require('../../assets/castler-icon.png')} style={{ alignSelf: 'center', opacity: 0.6, marginTop: 'auto', marginBottom: 'auto', width: width / 4, height: width / 4 }} />
              <Text style={styles.no_image_text}>No Image</Text>
            </View>)
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
          <Text style={styles.hint}>{(this.props.term) ? `Found ${this.props.total} Castles\nfor "${this.props.term}"` : `Select a castle\nto view full details`}</Text>
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
    flex: 1,
    backgroundColor: '$backgroundColor'
  },
  no_image: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  no_image_text: {
    textTransform: 'uppercase',
    color: '#555A5C',
    fontFamily: 'Biko-Bold',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100% - 104'
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
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
    backgroundColor: '$primaryColor'
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
    height: (width / 2) + 35 ,
    width: (width / 2) - 30,
    marginLeft: 12,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#eee',
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
    fontFamily: 'Biko-Bold'
  },
  text_grey: {
    color: '#555A5C',
    fontSize: 12,
    fontFamily: 'Biko'
  },
  listHeader: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$primaryColor'
  },
  hint: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Biko',
  }
})

const mapStateToProps = state => {
  return {
    term: state.term,
    castles: state.castles,
    page: parseInt(state.page),
    pages: state.pages,
    total: state.total,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  listCastles,
  findCastles
}

export default connect(mapStateToProps, mapDispatchToProps)(CastleList)
