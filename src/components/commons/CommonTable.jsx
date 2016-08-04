/*通用Table*/
import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import './CommonTable.less';

export default class CommonTable extends Component {

  static proptypes = {
    //表格columns
    columns: PropTypes.array.isRequired,
    //行选择
    rowSelection: PropTypes.object,
    //表格ajax请求service方法
    fetchTableDataMethod: PropTypes.func.isRequired,
    //表格行主键，建议填写
    rowKey: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ])
  }

  static defaultProps = {
    //自定义，设计时每个表格都有一列id
    rowKey: 'id',
    rowSelection: null
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        showQuickJumper: true,  //显示可以快速跳转至某页
        showSizeChanger: true,  //显示可以改变 pageSize
        showTotal: ( total => (`共 ${total} 条`))   //显示总共有多少条数据
      },
      loading: false
    };

    //初始化columns，默认加上每列文本居中显示
    this.props.columns.map( (column) => {
      if(!column.className)
        Object.assign(column, {className: 'column-align-center'})
      return column;
    });

    this.handleTableChange = this.handleTableChange.bind(this);
    //除了分页等参数外：form表单搜索数据等
    this._extraParams = {};
  }

  //设置额外查询表格数据
  setExtraParams(extraParams) {
    this._extraParams = extraParams;
  }

  //表格change事件：分页，过滤、排序等操作
  handleTableChange(pagination, filters, sorter) {
    //分页、排序、筛选 发生变化, 后台暂时不传 过滤、排序参数
    const pager = this.state.pagination;
    //触发的新的分页对象
    pager.current = pagination.current;
    //修改当前分页对象
    this.setState({
      pagination: pager
    });

    this.fetchTableData({
      limit: pagination.pageSize,
      start: pagination.current
    });
  }

  //ajax请求数据，默认带上分页数据
  fetchTableData(params = {start: 1, limit: 10}) {

    params = Object.assign({}, params, this._extraParams);
    console.log('CommonTable => fetchTableData => ', params);

    //开始加载数据
    this.setState({ loading: true });

    this.props.fetchTableDataMethod(params).then( ({jsonResult}) => {

      if(jsonResult.success) {
        const data = jsonResult.data;
        const pagination = this.state.pagination;
        pagination.current = params.start;
        pagination.total = data.length;

        //数据加载完成，显示表格数据
        this.setState({
          loading: false,
          data: data,
          pagination
        });

        console.log('CommonTable => fetchTableData => state ', this.state);
      }

    });
  }

  render() {
    console.log('CommonTable => render');
    return (
      <Table columns = { this.props.columns }
          rowSelection = { this.props.rowSelection }
          rowKey = { this.props.rowKey }
          dataSource = { this.state.data }
          pagination = { this.state.pagination }
          loading = { this.state.loading }
          onChange = { this.handleTableChange }
          scroll = {{ x: 1500 }}
          bordered
          />
    );
  }
}
