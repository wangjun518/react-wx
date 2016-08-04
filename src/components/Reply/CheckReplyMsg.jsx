/*审核朋友圈自动回复*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class CheckReplyMsg extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>审核朋友圈自动回复</Button>
    );
  }
}
