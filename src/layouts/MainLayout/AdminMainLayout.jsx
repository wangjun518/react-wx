import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import {Menu, Breadcrumb, Icon} from 'antd';
import { queryMeunData } from '../../services/menus';
import './AdminMainLayout.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class AdminMainLayout extends Component {
    static propTypes = {
        children : PropTypes.element.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
          // TODO: 远程加载数据openMenuKeys:['sub2']，Menu显示还是展开sub1，暂时不知道什么问题，记录下
          selectMenuKeys: ['1'],
          openMenuKeys: ['sub1'],
          menuJson: []
        };
    }

    fetchMenuData() {
      queryMeunData().then( ({jsonResult}) => {
        this.setState(jsonResult.data);
      });
    }

    componentDidMount() {
      this.fetchMenuData();
    }

    render() {
      const { selectMenuKeys, openMenuKeys, menuJson } = this.state;

      console.log(this.props);

        return (
          <div className="ant-layout-topaside">
              <div className="ant-layout-header">
                  Logo
              </div>
              <div className="ant-layout-wrapper">
                  <div className="ant-layout-container">
                      <aside className="ant-layout-sider">

                        <Menu mode="inline" defaultSelectedKeys={[...selectMenuKeys]} defaultOpenKeys={[...openMenuKeys]}>
                          {
                              //加载SubMenu
                              menuJson.map( (subMenu) => (
                                <SubMenu key={subMenu.key} title={<span><Icon type={subMenu.icon}/>{subMenu.text}</span>}>
                                  {
                                    //加载Submenu的子组件MenuItem
                                    subMenu.children.map( (menuItem) => (
                                      <MenuItem key={menuItem.key}><Link to={menuItem.url}>{menuItem.text}</Link></MenuItem>
                                    ) )
                                  }
                                </SubMenu>
                              ) )
                          }
                        </Menu>

                          {/* <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} onClick={this.handleClick}>
                          <SubMenu key="sub1" title={<span><Icon type="user"/>运营号管理</span>}>
                                <MenuItem key="1">
                                    <Link to="/optr/list">运营号列表</Link>
                                </MenuItem>
                                <MenuItem key="2">
                                  <Link to="/optr/channel">分配商业渠道</Link>
                                  </MenuItem>
                                <MenuItem key="3">
                                  <Link to="/optr/cs">分配客服</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop"/>商业渠道管理</span>}>
                                <MenuItem key="4">
                                  <Link to="/channel/add">添加渠道</Link>
                                </MenuItem>
                                <MenuItem key="5">
                                  <Link to="/channel/list">渠道列表</Link>
                                </MenuItem>
                                <MenuItem key="6">
                                  <Link to="/channel/edit">编辑渠道</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification"/>客服管理</span>}>
                                <MenuItem key="7">
                                  <Link to="/csm/add">添加客服</Link>
                                </MenuItem>
                                <MenuItem key="8">
                                  <Link to="/csm/list">客服列表</Link>
                                </MenuItem>
                                <MenuItem key="9">
                                  <Link to="/csm/disable">封号</Link>
                                </MenuItem>
                                <MenuItem key="10">
                                  <Link to="/csm/friend">移动客服好友</Link>
                                </MenuItem>
                                <MenuItem key="11">
                                  <Link to="/csm/edit">编辑客服</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="notification"/>广告管理</span>}>
                                <MenuItem key="12">
                                  <Link to="/ad/add">添加广告主题</Link>
                                </MenuItem>
                                <MenuItem key="13">
                                  <Link to="/ad/list">广告主题列表</Link>
                                </MenuItem>
                                <MenuItem key="14">
                                  <Link to="/ad/edit">编辑广告主题</Link>
                                </MenuItem>
                                <MenuItem key="15">
                                  <Link to="/ad/send">发朋友圈广告</Link>
                                </MenuItem>
                                <MenuItem key="16">
                                  <Link to="/ad/wclist">发朋友圈列表</Link>
                                </MenuItem>
                                <MenuItem key="17">
                                  <Link to="/ad/check">发朋友圈审核</Link>
                                </MenuItem>
                                <MenuItem key="18">
                                  <Link to="/ad/detail">发朋友圈详情</Link>
                                </MenuItem>
                                <MenuItem key="19">
                                  <Link to="/ad/freq">发朋友圈频率设置</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub5" title={<span><Icon type="notification"/>自动回复管理</span>}>
                                <MenuItem key="20">
                                  <Link to="/reply/set">自动回复设置</Link>
                                </MenuItem>
                                <MenuItem key="21">
                                  <Link to="/reply/view">查看自动回复信息</Link>
                                </MenuItem>
                                <MenuItem key="22">
                                  <Link to="/reply/edit">编辑自动回复信息</Link>
                                </MenuItem>
                                <MenuItem key="23">
                                  <Link to="/reply/check">审核朋友圈自动回复</Link>
                                </MenuItem>
                                <MenuItem key="24">
                                  <Link to="/reply/detail">自动回复详情</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub6" title={<span><Icon type="notification"/>系统参数设置</span>}>
                                <MenuItem key="25">
                                  <Link to="/param/amount">好友偏移设置</Link>
                                </MenuItem>
                                <MenuItem key="26">
                                  <Link to="/param/sync">数据同步设置</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="sub7" title={<span><Icon type="notification"/>权限管理</span>}/>
                        </Menu> */}
                      </aside>
                      <div className="ant-layout-content">
                          <div style={{marginBottom: 16}}>
                              <Breadcrumb>
                                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                                  <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                                  <Breadcrumb.Item>某应用</Breadcrumb.Item>
                              </Breadcrumb>
                          </div>
                          {this.props.children}
                      </div>
                  </div>
                  <div className="ant-layout-footer">
                      JULUN 版权所有 © 2016
                  </div>
              </div>
          </div>
        )
    }
}
