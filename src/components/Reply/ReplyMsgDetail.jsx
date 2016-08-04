/*自动回复详情*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class ReplyMsgDetail extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>自动回复详情</Button>
    );
  }
}
