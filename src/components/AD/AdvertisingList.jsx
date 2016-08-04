/*广告主题列表*/
import React, { Component, PropTypes} from 'react'
import {Button} from 'antd'

export default class AdvertisingList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Button type='primary'>广告主题列表</Button>
    );
  }
}
