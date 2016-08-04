import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'react-router';
import App from '../components/App';
import AdminApp from '../components/AdminApp';
import NotFound from '../components/NotFound'
import ChatContainer from '../components/Chat/ChatContainer';
import Todos from '../components/Todos/Todos';

import OptrList from '../components/Operations/OptrList';
import OptrChannel from '../components/Operations/OptrChannel';
import OptrCustomService from '../components/Operations/OptrCustomService';

import AddChannel from '../components/Channel/AddChannel';
import ChannelList from '../components/Channel/ChannelList';
import EditChannel from '../components/Channel/EditChannel';

import CustomServiceList from '../components/Csm/CustomServiceList';

import AddAdvertising from '../components/AD/AddAdvertising';
import AdvertisingList from '../components/AD/AdvertisingList';
import EditAdvertising from '../components/AD/EditAdvertising';
import SendADToWeChat from '../components/AD/SendADToWeChat';
import WeChatADList from '../components/AD/WeChatADList';
import CheckWeChatAD from '../components/AD/CheckWeChatAD';
import WeChatADDetailInfo from '../components/AD/WeChatADDetailInfo';
import SetWeChatFreq from '../components/AD/SetWeChatFreq';

import SetReplyMsg from '../components/Reply/SetReplyMsg';
import ViewReplyMsg from '../components/Reply/ViewReplyMsg';
import EditReplyMsg from '../components/Reply/EditReplyMsg';
import CheckReplyMsg from '../components/Reply/CheckReplyMsg';
import ReplyMsgDetail from '../components/Reply/ReplyMsgDetail';

import SetFriendsNum from '../components/Param/SetFriendsNum';
import DataSync from '../components/Param/DataSync';

import RoleMng from '../components/Role/RoleMng';

const Routes = ({ history }) =>
  <Router history={history}>
    {/*前台管理路由*/}
    <Route path="/" component={App}>
      <Route path="/chat" component={ChatContainer} />
      <Route path="/todo" component={Todos} />
    </Route>

    {/*后台管理路由*/}
    <Route path="/admin" component={AdminApp}>

      {/*运营号管理*/}
      {/*运营号列表*/}
      <IndexRedirect to="/optr/list" />
      <Route path="/optr/list" component={OptrList} />
      {/*分配商业渠道*/}
      <Route path="/optr/channel" component={OptrChannel} />
      {/*分配客服*/}
      <Route path="/optr/cs" component={OptrCustomService} />

      {/*商业渠道管理*/}
      {/*添加渠道*/}
      <Route path="/channel/add" component={AddChannel} />
      {/*渠道列表*/}
      <Route path="/channel/list" component={ChannelList} />
      {/*编辑渠道*/}
      <Route path="/channel/edit" component={EditChannel} />

      {/*客服管理*/}
      {/*添加客服*/}
      {/* <Route path="/csm/add" component={AddCustomService} /> */}
      {/*客服列表*/}
      <Route path="/csm/list" component={CustomServiceList} />
      {/*封号*/}
      {/* <Route path="/csm/disable" component={DisableCustomService} /> */}
      {/*移动客服好友*/}
      {/* <Route path="/csm/friend" component={CustomServiceFriends} /> */}
      {/*编辑客服*/}
      {/* <Route path="/csm/edit" component={EditCustomService} /> */}

      {/*广告管理*/}
      {/*添加广告主题*/}
      <Route path="/ad/add" component={AddAdvertising} />
      {/*广告主题列表*/}
      <Route path="/ad/list" component={AdvertisingList} />
      {/*编辑广告主题*/}
      <Route path="/ad/edit" component={EditAdvertising} />
      {/*发朋友圈广告*/}
      <Route path="/ad/send" component={SendADToWeChat} />
      {/*发朋友圈列表*/}
      <Route path="/ad/wclist" component={WeChatADList} />
      {/*发朋友圈审核*/}
      <Route path="/ad/check" component={CheckWeChatAD} />
      {/*发朋友圈详情*/}
      <Route path="/ad/detail" component={WeChatADDetailInfo} />
      {/*发朋友圈频率设置*/}
      <Route path="/ad/freq" component={SetWeChatFreq} />


      {/*自动回复管理*/}
      {/*自动回复设置*/}
      <Route path="/reply/set" component={SetReplyMsg} />
      {/*查看自动回复信息*/}
      <Route path="/reply/view" component={ViewReplyMsg} />
      {/*编辑自动回复信息*/}
      <Route path="/reply/edit" component={EditReplyMsg} />
      {/*审核朋友圈自动回复*/}
      <Route path="/reply/check" component={CheckReplyMsg} />
      {/*自动回复详情*/}
      <Route path="/reply/detail" component={ReplyMsgDetail} />


      {/*系统参数*/}
      {/*好友偏移设置*/}
      <Route path="/param/amount" component={SetFriendsNum} />
      {/*数据同步设置*/}
      <Route path="/param/sync" component={DataSync} />

      {/*权限管理*/}
      <Route path="/role" component={RoleMng} />

    </Route>
    <Route path="*" component={NotFound}/>
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
