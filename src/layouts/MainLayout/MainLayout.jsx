import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';
import './MainLayout.less';

class MainLayout extends Component{
  constructor(props){
    super(props)
    this.state = {
      collapse: true
    }
  }
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse
    })
  }
  render(){
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo">
            <p className="app-logo">Logo</p>
          </div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Link to="chat">
                <Icon type="team" /><span className="nav-text">聊天</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="todo">
                <Icon type="search" /><span className="nav-text">搜索</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="cross-circle-o" /><span className="nav-text">退出</span>
            </Menu.Item>
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>

        </div>
      </div>
    );
    /**
    <div className="ant-layout-footer">
      JULUN 版权所有 © 2016
    </div>
    */
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
