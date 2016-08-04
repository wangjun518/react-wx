/*发朋友圈列表*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class WeChatADList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>发朋友圈列表</Button>
    );
  }
}
