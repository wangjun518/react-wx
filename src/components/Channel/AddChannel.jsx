/*添加渠道*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>添加渠道</Button>
    );
  }
}
