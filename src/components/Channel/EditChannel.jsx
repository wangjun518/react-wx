/*编辑渠道*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class EditChannel extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>编辑渠道</Button>
    );
  }
}
