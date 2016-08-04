
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import './ChatContainer.less'
import classnames from 'classnames'
import {Popover, Button,Upload} from 'antd'
import FaceCollection from './FaceCollection'

// 保存编辑前的光标信息
let __selectionRange
let RangeUtil = {
  isPre: function(node){
    return "PRE" === node.nodeName && "editArea" === node.className
  },
  saveCurrentSelection: function(){
    if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            __selectionRange = sel.getRangeAt(0);
            let sc = __selectionRange.startContainer
            if(!RangeUtil.isPre(sc) && !RangeUtil.isPre(sc.parentNode)){
              __selectionRange = null
            }
            return
        }
    } else if (document.selection && document.selection.createRange) {
        __selectionRange = document.selection.createRange();
        return
    }
    __selectionRange = null
  },
  // 恢复到之前的光标区域
  restoreLastSelection: function(){
    if (__selectionRange) {
        if (window.getSelection) {
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(__selectionRange);
        } else if (document.selection && __selectionRange.select) {
            __selectionRange.select();
        }
    }
  },
  // 插入元素
  insertElement: function(element){
    var sel, range, html
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(element);
      }
    } else if (document.selection && document.selection.createRange) {
      document.selection.createRange().text = text;
    }
  }
}

// 工具条
class ToolBar extends Component{
  constructor (props){
    super(props)
    this.state = {
      sending: false
    }
  }
  handleFaceViewVisibleChange (display){
    if(display === true){
      // 保存当前的光标信息
      RangeUtil.saveCurrentSelection()
    }
  }
  render(){
    const {message, weixinID} = this.props
    return (
      <div className="toolbar">
        <Button type="primary"
          loading={this.state.sending}
          onClick={this.props.onSendMessage}
          style={{float: 'right', marginRight: 8}} >发送</Button>
        <span className="tips">按下Cmd+Enter换行</span>
        <Popover placement="topLeft"
          trigger="click"
          onVisibleChange={this.handleFaceViewVisibleChange}
          content={ <FaceCollection onFaceClick={this.props.onFaceClick} />} >
          <Button type="ghost" icon="smile-circle"/>
        </Popover>
        <Upload>
          <Button type="ghost" icon="picture" />
        </Upload>
      </div>
    )
  }
}

ToolBar.propTypes = {
}

const blankGif = require('../../../assets/images/app/blank.gif')

class SendMessageBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      childs: []
    }
  }
  // 获取消息内容模板，格式化之后的消息内容
  getFormatMessageContent(){
    let pre = ReactDOM.findDOMNode(this.refs.editArea)
    // 提取内容
    let nodes = pre.childNodes
    let msgFormat = ""
    for (let i = 0; i < nodes.length; i++){
      let node = nodes[i], name = node.nodeName
      if("IMG" === name){
        msgFormat += "[" + node.getAttribute("alt") + "]"
      }else if("#text" === name){
        msgFormat += node.nodeValue
      }
    }
    return msgFormat
  }
  handleSendMessage(){
    console.log("消息内容：", this.getFormatMessageContent())
    let pre = ReactDOM.findDOMNode(this.refs.editArea)
    this.props.onSendMessage(pre.innerHTML)
    pre.innerHTML = ""
  }
  handleKeyDown(e){
    // 回车
    if(e.keyCode == 13){
      if(e.ctrlKey){
        // 换行
        return
      }
      // 立即发送
      e.preventDefault()
      this.handleSendMessage()
    }
  }
  handleKeyUp(e){
    // 监视ctrl+v粘贴行为，这里没有考虑MAC用户
    if(e.keyCode === 86 && e.ctrlKey){
      // 只留下文本标签
      let pre = ReactDOM.findDOMNode(this.refs.editArea)
      pre.innerHTML = pre.innerText
    }
  }
  handleFaceClick(item){
    let faceClass, editDom = ReactDOM.findDOMNode(this.refs.editArea)
    if("qq" === item["type"]){
      faceClass = classnames("qqemoji", item["class"])
    }else{
      faceClass = classnames("emoji", item["class"])
    }
    let ele = document.createElement("img")
    ele.setAttribute("class", faceClass)
    ele.setAttribute("src", blankGif)
    ele.setAttribute("alt", item["title"] + "_" + item["type"])

    // 恢复光标
    RangeUtil.restoreLastSelection();
    if(__selectionRange){
      editDom.focus()
      // 插入元素
      RangeUtil.insertElement(ele)
    }else{
      editDom.innerHTML += `<img src="${blankGif}" class="${faceClass}" alt='${item["title"]}' />`
    }
  }
  render(){
    return (
      <div className="send-msg-form">
        <ToolBar
          onFaceClick={this.handleFaceClick.bind(this)}
          onSendMessage={this.handleSendMessage.bind(this)}/>
        <div className="input-conatiner">
          <pre ref="editArea"
            onKeyDown={this.handleKeyDown.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            className="editArea"
            contentEditable="true">
          </pre>
        </div>
      </div>
    )
  }
}

export default SendMessageBox;
