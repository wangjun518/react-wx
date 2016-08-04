/*自动回复设置*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class SetReplyMsg extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>自动回复设置</Button>
    );
  }
}
