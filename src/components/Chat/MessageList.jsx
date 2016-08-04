
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import './ChatContainer.less'
import classnames from 'classnames'

class MessageItem extends Component{
  constructor (props){
    super(props)
  }
  render(){
    const {message, weixinID, rawHtml} = this.props.messageObj
    const boxCls = classnames("message-item", {
      "right": weixinID === "80003"
    });
    let content = <p>{message}</p>
    if(rawHtml === true){
      content = <p dangerouslySetInnerHTML={{__html: message}}></p>
    }
    return (
      <li className={boxCls}>
          <a href="#" className="photo">
            <img alt="好友头像" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
          </a>
          <a href="#" className="message">
            {content}
          </a>
          <i className="caret-left" />
      </li>
    )
  }
}

MessageItem.propTypes = {
  messageObj: PropTypes.object.isRequired
}

class MessageList extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [
        {weixinID:"10001",message:"远方的朋友，你好吗"},
        {weixinID:"10001",message:"朋友，很忙吗?"},
        {weixinID:"80003",message:"我很好，你呢？"},
        {weixinID:"80003",message:"我正在写论文。。"},
        {weixinID:"80003",message:"一个关于关于儿童心理学的论文，你想听吗？"},
        {weixinID:"10001",message:"非常乐意，我洗耳恭听。"},
        {weixinID:"80003",message:"伴随着社会与经济的快速发展、城市化的建设，城市在增添了喧嚣的同时也变得浮躁，成人和儿童的心理也或多或少的承受着各式各样的压力和不良情绪，这样的环境下如果不能及时的发散势必会产生负性情感的淤积，对工作学习、身心健康有很大的影响。一般成人会有自己的发散方式，从而得到部分缓解。"},
        {weixinID:"10001",message:"伴随着社会与经济的快速发展、城市化的建设，城市在增添了喧嚣的同时也变得浮躁，成人和儿童的心理也或多或少的承受着各式各样的压力和不良情绪，这样的环境下如果不能及时的发散势必会产生负性情感的淤积，对工作学习、身心健康有很大的影响。一般成人会有自己的发散方式，从而得到部分缓解。"}
      ]
    }
  }
  addMessageHtml(msgHTML){
    this.setState({
      messages: this.state.messages.concat([
        {weixinID:"10001", message: msgHTML, rawHtml: true}
      ])
    })
  }
  addMessage(messageObj){
    this.setState({
      messages: this.state.messages.concat([messageObj])
    })
  }
  componentWillUpdate(){
    let node = ReactDOM.findDOMNode(this.refs.msgBody)
    console.log(node.scrollTop, node.offsetHeight +", "+ node.scrollHeight);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  }
  componentDidUpdate(){
    //if(this.shouldScrollBottom){
      let node = ReactDOM.findDOMNode(this.refs.msgBody)
      node.scrollTop = node.scrollHeight
    //}
  }
  render (){
    return (
      <div>
        <div className="message-head">
          <img alt="好友头像" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
          <h1>广发银行</h1>
        </div>
        <div ref="msgBody" className="message-body">
          <ul>
            {this.state.messages.map((item,index)=>{
              // if(Array.isArray(item)){
              //   return item
              // }else{
                return <MessageItem key={index} messageObj={item} />
              // }
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default MessageList;
