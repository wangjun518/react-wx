/*数据同步设置*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class DataSync extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>数据同步设置</Button>
    );
  }
}
