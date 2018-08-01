import React, { Component } from 'react'
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import SideSwipe from 'react-native-sideswipe';
import globalstyles from '../../utils/Globalstyles'
import dd2dms from '../../utils/dd2dms'

import { getCastleDetail } from '../../reducer'

const width = Dimensions.get('window').width

type Props = {}

class CastleDetail extends Component<Props> {
  constructor(props) {
    super()

    this.state = {
      currentIndex: 0,
      visited: false,
      ...props.castle
    }
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.name : 'Castle Details'
    };
  };

  componentDidMount() {
    const { _id } = this.props.navigation.state.params;
    this.props.getCastleDetail(_id);
  }

  changeVisitedState = () => {
    this.setState({visited: !this.state.visited})
  }

  render() {
    const { castle, loading } = this.props

    if (loading || !castle) return <Text>Loading...</Text>

    const {
      name,
      alternate_names,
      description,
      images,
      location,
      type,
      history,
      litrature,
      owners,
      preserved,
      utilization,
      dimensions
    } = castle;

    let hasCoords = false, lat, lon

    if (location.coordinates && location.coordinates.length) {
      lat = dd2dms(parseFloat(location.coordinates[0].split(/\D\s/)[0]), false)
      lon = dd2dms(parseFloat(location.coordinates[0].split(/\D\s/)[1]), true)
      hasCoords = true
    }

    if (images && !images.length) {
      images.push('NO_IMAGES')
    }

    return (
      <View style={styles.container}>
        <View style={styles.overlapping} />
        <View>
          <SideSwipe
            index={this.state.currentIndex}
            itemWidth={width + (width * 0.05)}
            style={{width: width + (width * 0.05)}}
            data={images}
            contentOffset={0}
            onIndexChange={index =>
              this.setState(() => ({ currentIndex: index }))
            }
            renderItem={(images) => {
              return (
                <View key={images.itemIndex} style={styles.itemShadow}>
                  {(images.item && images.item._id) ? (
                    <Image resizeMode="cover" source={{uri: 'http://localhost:8080/castles/image/' + images.item._id}} style={styles.slide_image}/>
                  ) : (
                    <Image resizeMode="contain" source={require('../../assets/castler-icon.png')} style={[styles.slide_image, styles.slide_no_image]}/>
                  )}
                </View>
              )
            }}
          />
          <View style={[globalstyles.columns, styles.image_bottom]}>
            <View style={[globalstyles.column, styles.type_box]}>
              <Text style={styles.type_text}>{type}</Text>
            </View>
            <View style={[styles.visited_box, globalstyles.column]}>
              <TouchableWithoutFeedback onPress={() => this.changeVisitedState()}>
                {(!this.state.visited) ? (
                  <Image resizeMode="contain" source={require('../../assets/map-pin-outline.png')} style={styles.map_marker}/>
                ) : (
                  <Image resizeMode="contain" source={require('../../assets/map-pin-solid.png')} style={styles.map_marker}/>
                )}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          {(hasCoords) ? (<View style={[globalstyles.columns, styles.gps_wrapper]}>
            <View style={[globalstyles.column, styles.gps_box]}>
              <View>
                <Text style={styles.gps_hint}>Latitude</Text>
                <Text style={styles.gps_text}>{`${lat.deg}° ${lat.min}' ${lat.sec}'' ${lat.dir}`}</Text>
              </View>
            </View>
            <View style={[globalstyles.column, styles.sep_gps, styles.gps_box]}>
              <View>
                <Text style={styles.gps_hint}>Longitude</Text>
                <Text style={styles.gps_text}>{`${lon.deg}° ${lon.min}' ${lon.sec}'' ${lon.dir}`}</Text>
              </View>
            </View>
          </View>) : null }
          <ScrollView style={styles.scrollContainer}>
            {(alternate_names.length && alternate_names[0].length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Alternate Names</Text>
                <Text style={styles.box_text}>{alternate_names.join(', ')}</Text>
              </View>
            ) : null }
            {(description.length || preserved.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Description / Preserved</Text>
                {(description.length) ? <Text style={styles.box_text}>{description}</Text> : null}
                {(preserved.length) ? <Text style={styles.box_text}>{preserved}</Text> : null}
              </View>
            ) : null }
            {(utilization.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Usage today</Text>
                {utilization.map((u, i) => {
                  return (<Text style={styles.box_text}>{u}</Text>)
                })}
              </View>
            ) : null }
            {(owners.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Owners</Text>
                {owners.map((o, i) => {
                  return (<Text style={styles.box_text}>{o.name} {o.date}</Text>)
                })}
              </View>
            ) : null }
            {(history.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>History</Text>
                {history.map((h, i) => {
                  return (<Text style={styles.box_text}>{h.date} {h.description}</Text>)
                })}
              </View>
            ) : null }
            {(dimensions.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Dimensions</Text>
                {dimensions.map((d, i) => {
                  return (<Text style={styles.box_text}>{d}</Text>)
                })}
              </View>
            ) : null }
            {(litrature.length) ? (
              <View style={styles.box}>
                <Text style={styles.box_label}>Litratur</Text>
                {litrature.map((l, i) => {
                  return (<Text style={styles.box_text}>{l}</Text>)
                })}
              </View>
            ) : null }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  scrollContainer: {
    flex: 1,

  },
  container: {
    flex: 1,
    backgroundColor: '$backgroundColorLight'
  },
  sep_gps: {
    borderLeftWidth: 1,
    borderColor: '$primaryColor'
  },
  map_marker: {
    width: 18,
    height: 22
  },
  box: {
    backgroundColor: '$backgroundColorLight',
    borderBottomWidth: 1,
    borderColor: '$mutedColor',
    paddingVertical: 16,
    paddingHorizontal: 14
  },
  box_text: {
    color: '#1D1E20'
  },
  box_label: {
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '$mutedColor',
    fontSize: 12,
    marginBottom: 6
  },
  image_bottom: {
    position: 'absolute',
    width: width,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  visited_box: {
    alignItems: 'flex-end',
    padding: 14,
    justifyContent: 'center'
  },
  type_box: {
    alignItems: 'flex-start',
    padding: 14,
    justifyContent: 'center'
  },
  type_text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  gps_hint: {
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '$mutedColor',
    fontSize: 12
  },
  gps_text: {
    color: '$primaryColor',
    fontWeight: 'bold',
    fontSize: 16
  },
  gps_box: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gps_wrapper: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    borderBottomWidth: 1,
    borderColor: '$mutedColor',
    backgroundColor: '$backgroundColorLight'
  },
  itemShadow: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    backgroundColor: '#fff',
    height: 240
  },
  slide_no_image: {
    height: 180,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    opacity: 0.6
  },
  slide_image: {
    width: width,
    height: 240,
    marginRight: width * 0.05
  },
  slider: {
    height: 240,
    width: '100%',
    flex: 0
  },
  content: {
    flex: 1
  },
  overlapping: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 80,
    backgroundColor: '$primaryColor'
  },
})

const mapStateToProps = ({ castle, loading }) => ({
  castle,
  loading
})

const mapDispatchToProps = {
  getCastleDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(CastleDetail)
