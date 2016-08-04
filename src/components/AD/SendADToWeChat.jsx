/*发朋友圈广告*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class SendADToWeChat extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>发朋友圈广告</Button>
    );
  }
}
