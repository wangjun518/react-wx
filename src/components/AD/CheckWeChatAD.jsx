/*发朋友圈审核*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class CheckWeChatAD extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>发朋友圈审核</Button>
    );
  }
}
