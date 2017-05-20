import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CreationList from '../pages/creation/list'
import * as creationActions from '../actions/creation'

class creationContainer extends Component {
  constructor (props) {
    super(props)
  }

  _onLoadItem (row) {
    this.props.navigation.navigate('Detail', {
      rowData: row
    })
  }

  componentWillMount () {
    this.props.fetchCreations()
  }

  render () {
    return (
      <CreationList
        onLoadItem={this._onLoadItem.bind(this)}
        {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  const {
    isRefreshing,
    isLoadingTail,
    videoList,
    videoTotal,
    page,
  } = state.get('creations')

  const {
    popup,
    user
  } = state.get('app')

  return {
    isRefreshing: isRefreshing,
    isLoadingTail: isLoadingTail,
    videoTotal: videoTotal,
    popup: popup,
    user: user,
    videoList: videoList
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

// 本质上两者没有区别，只是被 connect 过的 component 中的 this.props 有了 dispatch 属性

export default connect(mapStateToProps, mapDispatchToProps)(creationContainer)
