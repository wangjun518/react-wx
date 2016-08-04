/*客服列表*/
import React, { Component, PropTypes} from 'react';
import {Form, Input, Select, Button, Row, Col, Modal} from 'antd';
import {is, Map} from 'immutable';
import CommonTable from '../Commons/CommonTable.jsx';
import CsmSearchForm from './CsmSearchForm.jsx';
import EditCmsModal from './EditCmsModal.jsx';
import TransferFrdsModal from './TransferFrdsModal.jsx';
import {queryCustomServiceList} from '../../services/customService';
const FormItem = Form.Item;
const Option = Select.Option;

class CustomServiceList extends Component {
  constructor(props) {
    super(props);
    this.state={
      title:'',   //添加、编辑弹出框标题
      data: {},  //添加、编辑弹出框中form数据

      sourceId: 0  //转移好友弹出框
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRefreshTable = this.handleRefreshTable.bind(this);
    this._preSearchObj = null;
  }

  getColumns() {
    return [
      {title: '添加时间',        dataIndex: 'create_time'},
      {title: '姓名',           dataIndex: 'name',        width: 150},
      {title: '手机号',        dataIndex: 'mobile',         width: 150},
      {title: '客服号',        dataIndex: 'csm_no',        width: 150},
      {title: '运营号总数/正常数',  dataIndex: 'csm_amount',       width: 150},
      {title: '微信好友总数/正常数',  dataIndex: 'wx_amount',    width: 150},
      {title: '客服状态',       dataIndex: 'status', width: 150},
      {title: '操作',           dataIndex: 'id',            key: 'operation',     fixed: 'right', width:200, render: (id, record) => (
        <span>
          <a href="javascript:void(0)" onClick={this.handleEdit.bind(this, id, record)}>编辑客服</a>
          <span className="ant-divider"></span>
          <a href="javascript:void(0)" onClick={this.handleDisable.bind(this, id, record)}>封号</a>
          <span className="ant-divider"></span>
          <a href="javascript:void(0)" onClick={this.handleTransferFrd.bind(this, id, record)}>转移好友</a>
        </span>
      )}
    ];
  }

  //添加
  handleAdd() {
    this.setState({title: '添加客服', data: {}});
  }

  //编辑
  handleEdit(id, record) {
    console.log('编辑 => ', record);
    this.setState({title: '编辑客服', data: record});
  }

  //封号
  handleDisable(id, record) {
    console.log('CustomServiceList => handleDisable', record);
  }

  //转移好友
  handleTransferFrd(id, record) {
    console.log('CustomServiceList => handleTransferFrd', record);
    this.setState({ sourceId: record['id'] });
  }

  handleSearch(newSearchObj) {
    if( this._preSearchObj == null || !is( Map(newSearchObj), Map(this._preSearchObj) ) ) {
      this._preSearchObj = newSearchObj;
      this.refs.commontable.setExtraParams(newSearchObj);
      this.refs.commontable.fetchTableData();
    }
  }

  clearChildProps() {
    this.setState({ title:'', data: {}, sourceId: 0 });
  }

  handleRefreshTable() {
    //刷新表格数据
    this.clearChildProps();
  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    console.log('CustomServiceList => render');

    const { getFieldProps } = this.props.form;
    const usernameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '请输入客服姓名' },
      ],
    });
    const mobileProps = getFieldProps('mobile', {
      rules: [
        { required: true, message: '请输入客服手机号' },
      ],
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>
        <CsmSearchForm onSearchData = { this.handleSearch } onAddModal={ this.handleAdd } />
        <CommonTable ref="commontable"
          columns = { this.getColumns() }
          rowKey = { record => record.id }
          fetchTableDataMethod = { queryCustomServiceList }
        />
        <EditCmsModal onRefreshTable={this.handleRefreshTable} title={this.state.title} data={this.state.data} />
        <TransferFrdsModal onRefreshTable={this.handleRefreshTable} sourceId={this.state.sourceId} />
      </div>
    );
  }
}

CustomServiceList = Form.create()(CustomServiceList);
export default CustomServiceList;
