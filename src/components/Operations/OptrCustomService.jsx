/*分配客服*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class OptrCustomService extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>分配客服</Button>
    );
  }
}
