/*渠道列表*/
import React, { Component, PropTypes} from 'react'
import {Button,Table,Select,Input,Row,Col,Form,Modal} from 'antd'
import { Map, is } from 'immutable';
import CommonTable from '../commons/CommonTable.jsx';
import {queryChannelForm,queryChannelList} from '../../services/channel';
const FormItem = Form.Item;
const Option = Select.Option;

class ClannelModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      channelRecord:{},
      title:'新增渠道',
      loading: false,
      visible: false,
    };
  }
  showModal(title,record) {
    console.log("窗口：",record);
    this.setState({
      visible: true,
      title:title,
      channelRecord:record
    });
  }
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  render() {
    const {channelRecord} = this.state;
    return (
      <div>
        <Modal ref="modal"
          visible={this.state.visible}
          title={this.state.title} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
              提 交
            </Button>,
          ]}
        >
          <p>{channelRecord==null?'':channelRecord.channel_id}</p>
          <p>{channelRecord==null?'':channelRecord.channel_name}</p>
          <p>运营数{channelRecord==null?'':channelRecord.yy_num}</p>
        </Modal>
      </div>
    );
  }
};

class ClannelQueryFrom extends Component{
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSearchChannel: PropTypes.func.isRequired,
    addChannel: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state={
      numType:{defaultValue:'',items:[]}
    };
    this.formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 14
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  _onSearchChannel(v){
    console.log("channelform==》"+v);
    this.props.onSearchChannel(v);
  }
  handleSearch(e){
    e.preventDefault();
  //  console.log('收到的内容：'+this.props.form.getFieldsValue());
    this._onSearchChannel(this.props.form.getFieldsValue());
  }

  //获取form组件下拉框值
  fetchFormData() {
    queryChannelForm().then( ({ jsonResult }) => {
        if(jsonResult.success) {
          const data = jsonResult.data;
          this.setState({
            numType: data.numType,
          });
          //加载完form所需数据，默认查询表格数据
          this._onSearchChannel({
            channel_id: '',
            channel_name: '',
            num_type: data.numType.defaultValue
          });
        }
      });
  }

  //挂在完毕，进行ajax操作
  componentDidMount() {
    this.fetchFormData();
  }
  addChannel(){
    console.log("新增--");
    this.props.addChannel();
  }
  render(){
    const {getFieldProps} = this.props.form;
    const {numType} = this.state;
    return (
      <Form horizontal form={this.props.form} onSubmit={this.handleSearch}>
        <Row gutter={16}>
          <Col sm={6}>
            <FormItem label="渠道ID" {...this.formItemLayout}>
              <Input {...getFieldProps('channel_id',{initialValue:''})} placeholder="输入渠道ID"></Input>
            </FormItem>
          </Col>
          <Col sm={6}>
            <FormItem label="渠道名称" {...this.formItemLayout}>
              <Input {...getFieldProps('channel_name',{initialValue:''})} placeholder="输入渠道名称"></Input>
            </FormItem>
          </Col>
          <Col sm={6}>
            <FormItem label="好友总数" {...this.formItemLayout}>
              <Select {...getFieldProps('num_type',{initialValue:numType.defaultValue})}>
                {
                  numType.items.map((item,idx)=>{
                    return <Option key={idx} value={item.value}>{item.text}</Option>
                  })
                }
              </Select>
            </FormItem>
          </Col>
          <Col sm={3}>
            <Button type="primary" htmlType="submit" icon="search">搜索</Button>
          </Col>
          <Col sm={3}>
            <Button type="primary" icon="plus-circle-o" onClick={this.addChannel.bind(this)}>新增</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
ClannelQueryFrom = Form.create()(ClannelQueryFrom);

export default class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.preSelectData={};
  }
  editChannel(record, index){
    console.log(record);
    console.log(index);
    this.refs.clannelModalId.showModal('修改渠道',record);
  }
  getCannelColumns(){
    return [
      { title: '渠道ID', dataIndex: 'channel_id', width: 150 ,sorter: (a, b) => a.channel_id - b.channel_id},
      { title: '渠道名称', dataIndex: 'channel_name'},
      { title: '运营号总数/正常数', dataIndex: 'yy_num',  width: 150 },
      { title: '微信好友总数/正常数', dataIndex: 'wx_num',  width: 150 },
      { title: '创建时间', dataIndex: 'create_time',key:'create_time',width: 150 },
      {
        title: '操作',
        key: 'channel',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => <a href="#" onClick={this.editChannel.bind(this,record, index)}>编辑渠道</a>,
      }
    ];
  }
  handleSearch(newSearchObj){
    if (!is(Map(newSearchObj),Map(this.preSelectData))) {
      console.log('OptrList => handleSearch => 收到新的搜索数据', newSearchObj);
      this.preSelectData = newSearchObj;
      this.refs.clannelTable.setExtraParams(newSearchObj);
      this.refs.clannelTable.fetchTableData();
    }else {
      console.log('OptrList => handleSearch => 搜索数据无变化');
    }
  }
  showChannel(){
      console.log('showChannel =>',this.refs);
      this.refs.clannelModalId.showModal('新增渠道',null);
  }

  render() {
    return (
      <div>
        <ClannelModal ref="clannelModalId"></ClannelModal>
        <ClannelQueryFrom onSearchChannel={this.handleSearch} addChannel={this.showChannel.bind(this)}></ClannelQueryFrom>
        <CommonTable ref="clannelTable" columns={this.getCannelColumns()}  fetchTableDataMethod={queryChannelList} rowKey={record =>record.id}/>
      </div>
    );
  }
}
