/*编辑自动回复信息*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class EditReplyMsg extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>编辑自动回复信息</Button>
    );
  }
}
