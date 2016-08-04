/*分配商业渠道*/
import React, { Component, PropTypes} from 'react'
import {Tabs, Form, Select, Input, Button, Radio, Row, Col} from 'antd';
import {is, Map} from 'immutable';
import CommonTable from '../Commons/CommonTable.jsx';
import {queryOptrChannel} from '../../services/operations';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class OperationsForm extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventExtensions();
  }

  render() {

    console.log('OperationsForm => render');
    const { getFieldProps } = this.props.form;

    return (

      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem labelCol={{ span:2 }} wrapperCol={{ span:5　}} label="选择商业渠道">
          <Select {...getFieldProps('type', { initialValue: '' }) }>
            <Option key="1" value="11">商业渠道1</Option>
            <Option key="2" value="22">商业渠道2</Option>
            <Option key="3" value="33">商业渠道3</Option>
          </Select>
        </FormItem>
        <FormItem labelCol={{ span:2 }} wrapperCol={{ span:5　}} label="选择微信号">
          <p className="ant-form-text" id="userName" name="userName" style={{ color:'red' }}>已选择20个运营微信号，共5000好友</p>
          <Button key="submit" type="primary" icon="check" size="large" htmlType="submit" style={{float:'right'}}>提交</Button>
        </FormItem>
      </Form>

    );

  }

}

OperationsForm = Form.create()(OperationsForm);

//运行号列表搜索表单
class OperationsSearchForm extends Component {

  constructor(props) {
    super(props);
    this.searchFormItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14　}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchChannel( this.props.form.getFieldsValue() );
  }

  render() {
    console.log('OperationsSearchForm => render');
    const { getFieldProps } = this.props.form;

    return (

      <Form horizontal onSubmit={this.handleSubmit}>
        <Row type="flex" justify="space-around">
          <Col sm={4}>
            <FormItem {...this.searchFormItemLayout} label="原始组号">
              <Select {...getFieldProps('orig_group_num') } placeholder="请选择原始组号">
                <Option key="1" value="11">商业渠道1</Option>
                <Option key="2" value="22">商业渠道2</Option>
                <Option key="3" value="33">商业渠道3</Option>
              </Select>
            </FormItem>
          </Col>
          <Col sm={4}>
            <FormItem {...this.searchFormItemLayout} label="运营手机号">
              <Input { ...getFieldProps('mobile') } placeholder="请输入手机号" />
            </FormItem>
          </Col>
          <Col sm={4}>
            <FormItem {...this.searchFormItemLayout} label="运营微信号">
              <Input { ...getFieldProps('wc_no') } placeholder="请输入微信号" />
            </FormItem>
          </Col>
          <Col sm={4}>
            <FormItem {...this.searchFormItemLayout} label="状态">
              <Select {...getFieldProps('status') } placeholder="请选择状态">
                <Option key="1" value="11">商业渠道1</Option>
                <Option key="2" value="22">商业渠道2</Option>
                <Option key="3" value="33">商业渠道3</Option>
              </Select>
            </FormItem>
          </Col>
          <Col sm={4}>
            <Button key="search" icon="search" size="large" type="primary" htmlType="submit">搜索</Button>
          </Col>
        </Row>
      </Form>

    );

  }

}

OperationsSearchForm = Form.create()(OperationsSearchForm);

//按运营号分配
class OperationsPane extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: 1, //radio默认选中值
      // selectedRowKeys: [] //表格选中行
    };
    this.handelSearch = this.handelSearch.bind(this);
    //上一次的搜索表单数据
    this._preSearchObj = {};
  }

  getColumns() {
    return [
      {title: '添加时间',        dataIndex: 'create_time',   width: 150},
      {title: '原始组号',      dataIndex: 'orig_gno',        width: 150},
      {title: '运营手机号',      dataIndex: 'mobile',         width: 150},
      {title: '运营微信号',      dataIndex: 'wc_no',        width: 150},
      {title: '运营微信号状态',  dataIndex: 'status',       width: 150},
      {title: '好友总数(人)',  dataIndex: 'friend_num',    width: 150},
      {title: '商业渠道',       dataIndex: 'channel'}/*,
      {title: '操作',           dataIndex: 'id',            key: 'operation',     fixed: 'right', width:100, render: (text, record) => (
        <span>
          <a href="javascript:void(0)" onClick={this.unbind.bind(this, text, record)}>解除绑定</a>
        </span>
      )}*/
    ];
  }

  handelSearch(newSearchObj) {
    if( !is( Map(newSearchObj), Map(this._preSearchObj) ) ) {

      this._preSearchObj = newSearchObj;

      //调用子组件CommonTable中设置搜索数据参数
      this.refs.commontable.setExtraParams(newSearchObj);
      //调用子组件CommonTable中ajax请求table数据
      this.refs.commontable.fetchTableData();

    }
  }

  handleRowChange(selectedRowKeys, selectedRows) {
    console.log('selectedRowKeys: ', selectedRowKeys, 'selectedRows: ', selectedRows);
  }

  handleSelect(record, selected, selectedRows) {
    console.log('onSelect', record, " selected: ", selected, " selectedRows: ", selectedRows);
  }

  handleSelectAll(selected, selectedRow, changeRows) {
    console.log('handleSelectAll', selected, " selectedRow: ", selectedRow, " changeRows: ", changeRows);
  }

  handleRadioChange(e) {
    this.setState({
      selectValue: e.target.value
    });
  }

  render() {

    const { getFieldProps } = this.props.form;
    const { selectValue } = this.state;

    return (
      <div>
        <OperationsForm />
        <div style={{'borderBottom':'1px solid #e9e9e9', marginBottom: 24}} />
        <OperationsSearchForm onSearchChannel = { this.handelSearch } />
        <div style={{'borderBottom':'1px solid #e9e9e9', marginBottom: 24}} />
        <div style={{marginBottom: 24}}>
          <RadioGroup onChange={this.handleRadioChange.bind(this)} value={selectValue}>
            <Radio key="a" value={1}>选择搜索结果的全部数据</Radio>
            <Radio key="b" value={2}>选择当前页数据</Radio>
          </RadioGroup>
        </div>
        <CommonTable ref="commontable"
          columns = { this.getColumns() }
          rowSelection = {{
            onChange: this.handleRowChange,
            onSelect: this.handleSelect,
            onSelectAll: this.handleSelectAll
          }}
          rowKey = { record => record.id }
          fetchTableDataMethod = { queryOptrChannel }
        />
      </div>
    );

  }
}

OperationsPane = Form.create()(OperationsPane);

//按好友数分配
class FriendPane extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {getFieldProps} = this.props.form;

    const minFrdNum = 1000;
    const maxFrdNum = 50000;
    const opNum = 12;
    const peopleNum = 30500;

    return (
      <Form horizontal form={this.props.form}>
        <FormItem labelCol={{ span:8 }} wrapperCol={{ span:8　}} label="分配好友">
          <Input {...getFieldProps('friend_num', {initialValue:''})} placeholder="请输入分配好友数"  style={{ width: '60%' }}/>
          <span className="ant-form-text" style={{marginLeft: 8, marginRight:16}}>人</span>
          <Button size="default" type="ghost">全部</Button>
        </FormItem>
        <FormItem wrapperCol={{ span:8, offset: 9 }}>
          <p className="ant-form-text" id="static" name="static" style={{ 'color':'red' }}>可分配好友{maxFrdNum}人，最少分配{minFrdNum}人</p>
        </FormItem>
        <FormItem labelCol={{ span: 8, offset: 2 }} label="实际将分配好友">
          <p className="ant-form-text" id="static" name="static">
            来自<span style={{ 'color':'red' }}>{opNum}</span>个运营微信号，共
            <span style={{ 'color':'red' }}>{peopleNum}</span>人
          </p>
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 10 }}>
          <Button icon="check" size="large" type="primary">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

FriendPane = Form.create()(FriendPane);

export default class OptrChannel extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <Tabs type="card">
        <TabPane key="1" tab="按运营号分配">
          <OperationsPane />
        </TabPane>
        <TabPane key="2" tab="按好友数分配">
          <FriendPane />
        </TabPane>
      </Tabs>
    );
  }
}
