/*添加广告主题*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class AddAdvertising extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>添加广告主题</Button>
    );
  }
}
