import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getCastleDetail } from '../../reducer'

type Props = {}

class CastleDetail extends Component<Props> {
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

  render() {
    const { castleInfo, loading } = this.props;
    if (loading || !castleInfo) return <Text>Loading...</Text>

    const {
      name,
      alternate_names,
      description
    } = castleInfo;

    return (
      <View>
        <Text>{name}</Text>
        <Text>{alternate_names.join(', ')}</Text>
        <Text>{description}</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ castleInfo, loading }) => ({
  castleInfo,
  loading
})

const mapDispatchToProps = {
  getCastleDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(CastleDetail)
