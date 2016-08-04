import React, {Component, PropTypes} from 'react'
import QueueAnim from 'rc-queue-anim'
import './ChatContainer.less'
import {Badge} from 'antd'

class FriendItem extends Component{
  constructor (props){
    super(props)
  }
  render(){
    const {photo, title, pubDate, message, unReadMsgCount} = this.props

    return (
      <li className="friend-item">
          <a href="#">
            <div className="friend-item-left">
              <img className="friend-photo" alt="好友头像"
                  src={photo} />
              {(unReadMsgCount && unReadMsgCount > 0)
                ? <span className="friend-msgcount">{unReadMsgCount}</span>
                : null}

            </div>
            <div className="friend-item-right">
              <div className="friend-item-title">
                <h3>{title}</h3>
                <i>{pubDate}</i>
              </div>
              <p className="friend-item-message">
                {message}
              </p>
            </div>
          </a>
      </li>
    )
  }
}

FriendItem.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  unReadMsgCount: PropTypes.number
}

const FriendItemList = ({props}) => {
  return (
    <QueueAnim component="ul" type={['right', 'left']}>
      <FriendItem key="0" unReadMsgCount={1} photo="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        title="广发银行" pubDate="刚刚" message="账户余额知多少" />
      <FriendItem key="1" unReadMsgCount={2} photo="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        title="浦发银行" pubDate="昨天" message="您的账户转入100,000,000元" />
    </QueueAnim>
  )
}


export default FriendItemList;
