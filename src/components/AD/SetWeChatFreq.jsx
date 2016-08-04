/*发朋友圈频率设置*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class SetWeChatFreq extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>发朋友圈频率设置</Button>
    );
  }
}
