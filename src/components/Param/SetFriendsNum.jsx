/*好友偏移设置*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class SetFriendsNum extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>好友偏移设置</Button>
    );
  }
}
