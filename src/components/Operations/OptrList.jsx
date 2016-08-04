/*运营号列表*/
import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Select, Button, Table } from 'antd';
import { Map, is } from 'immutable';
import CommonTable from '../Commons/CommonTable.jsx';
import HorizontalForm from '../Commons/HorizontalForm.jsx';
import { queryOptrFormData, queryOptrList } from '../../services/operations';
const FormItem = Form.Item;
const Option = Select.Option;

class OptrSearchForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onSearchOptr: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      typeItem: { defaultValue: '', items: []},
      statusItem: { defaultValue: '', items: []}
    };

    this.formItemLayout = {
      labelCol: {　span: 10　},
      wrapperCol: {　span: 14　}
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  //调用父组件搜索方法
  _onSearchOptr(values) {
    console.log('OptrSearchForm => _onSearchOptr', values);
    //调用父组件方法，传递form搜索条件数据
    this.props.onSearchOptr(values);
  }

  handleSearch(e) {
    e.preventDefault();
    this._onSearchOptr(this.props.form.getFieldsValue())
  }

  //获取form组件下拉框值
  fetchFormData() {
    queryOptrFormData().then( ({ jsonResult }) => {
        if(jsonResult.success) {
          const data = jsonResult.data;
          console.log('data: ', data);
          this.setState({
            typeItem: data.typeItem,
            statusItem: data.statusItem
          });

          //加载完form所需数据，默认查询表格数据
          this._onSearchOptr({
            mobile: '',
            wc_no: '',
            type: data.typeItem.defaultValue,
            status: data.statusItem.defaultValue
          });
        }
      });
  }

  //挂在完毕，进行ajax操作
  componentDidMount() {
    this.fetchFormData();
  }

  render() {
    console.log("OptrSearchForm => render");
    const {getFieldProps} = this.props.form;
    const {typeItem, statusItem} = this.state;

    return (
      <Form horizontal form={this.props.form} onSubmit={this.handleSearch}>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <FormItem label="类型" {...this.formItemLayout}>
              <Select {...getFieldProps('type', { initialValue: typeItem.defaultValue }) }>
                {
                  typeItem.items.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.text}</Option>;
                  })
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="运行手机号" {...this.formItemLayout} >
              <Input { ...getFieldProps('mobile', { initialValue: '' }) } placeholder="请输入手机号" />
            </FormItem>
          </Col>
         <Col span={4}>
            <FormItem label="运营微信号" {...this.formItemLayout}>
              <Input {...getFieldProps('wc_no', { initialValue: '' }) } placeholder="请输入微信号" />
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="状态" {...this.formItemLayout}>
              <Select {...getFieldProps('status', { initialValue: statusItem.defaultValue }) }>
                {
                  statusItem.items.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.text}</Option>;
                  })
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <Button key="search" icon="search" type="primary" size="large" htmlType="submit">搜索</Button>
          </Col>
        </Row>
      </Form>
    );
  }
};

OptrSearchForm = Form.create()(OptrSearchForm);

export default class OptrList extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    //上一次表单搜索数据
    this._preSearchObj = {};
  }

  getColumns() {
    return [
      {title: '创建时间',        dataIndex: 'create_time',   key: 'create_time',   width: 150},
      {title: '运营手机号',      dataIndex: 'mobile',        key: 'mobile',        width: 150},
      {title: '运营微信号',      dataIndex: 'wc_no',         key: 'wc_no',         width: 150},
      {title: '运营微信号状态',  dataIndex: 'status',        key: 'status',        width: 150},
      {title: '好友总数(人)',  dataIndex: 'friend_num',      key: 'friend_num',    width: 150},
      {title: '商业渠道',       dataIndex: 'channel',       key: 'channel'},
      {title: '客服号',         dataIndex: 'cs_no',         key: 'cs_no',         width: 150},
      {title: '操作',           dataIndex: 'id',            key: 'operation',     fixed: 'right', width:100, render: (text, record) => (
        <span>
          <a href="javascript:void(0)" onClick={this.unbind.bind(this, text, record)}>解除绑定</a>
        </span>
      )}
    ];
  }

  unbind(text, record) {
    console.log('解绑', text, record);
  }

  handleSearch(newSearchObj) {

    if(!is(Map(this._preSearchObj), Map(newSearchObj))) {
      //保存前一次搜索form数据
      this._preSearchObj = newSearchObj;
      console.log('OptrList => handleSearch => 收到新的搜索数据', newSearchObj);
      //调用子组件CommonTable中设置搜索数据参数
      this.refs.commontable.setExtraParams(newSearchObj);
      //调用子组件CommonTable中ajax请求table数据
      this.refs.commontable.fetchTableData();
    } else {
      console.log('OptrList => handleSearch => 搜索数据无变化');
    }

  }

  render() {
    console.log('OptrList => render');
    return (
      <div>
        <OptrSearchForm onSearchOptr = { this.handleSearch } />
        {/* <HorizontalForm itemNum={4}>
          <Input placeholder="请输入手机号" />
          <Input />
          <Input />
          <Input />
        </HorizontalForm> */}
        <CommonTable ref="commontable"
          columns = { this.getColumns() }
          rowKey = { record => record.id }
          fetchTableDataMethod = { queryOptrList }
        />
      </div>
    );
  }
}
