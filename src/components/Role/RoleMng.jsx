/*权限管理*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class RoleMng extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>权限管理</Button>
    );
  }
}
