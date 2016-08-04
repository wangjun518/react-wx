/*发朋友圈详情*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class WeChatADDetailInfo extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>发朋友圈详情</Button>
    );
  }
}
