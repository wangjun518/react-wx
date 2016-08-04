/*封号弹出框*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class DisableCustomService extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>封号</Button>
    );
  }
}
