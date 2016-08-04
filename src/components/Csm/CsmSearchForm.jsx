/*客服列表中搜索表单*/
import React, { Component, PropTypes} from 'react';
import {Form, Input, Select, Button, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class CsmSearchForm extends Component {

  static propTyps = {
    onSearchData: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchData( this.props.form.getFieldsValue() );
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.onAddModal();
  }

  render() {
    console.log("CsmSearchForm => render");
    const { getFieldProps } = this.props.form;

    return (
      <Form horizontal onSubmit = { this.handleSubmit }>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <FormItem label="客服号" labelCol={{ span:10 }} wrapperCol={{ span:14　}}>
              <Input {...getFieldProps('csm_no')} placeholder="请输入客服号" />
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="客服状态" labelCol={{ span:10 }} wrapperCol={{ span:14　}}>
              <Select {...getFieldProps('csm_no')} placeholder="请选择客户状态" >
                <Option key="1">全部</Option>
                <Option key="2">正常</Option>
                <Option key="3">禁用</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="好友总数" labelCol={{ span:10 }} wrapperCol={{ span:14　}}>
            <Select {...getFieldProps('frd_no')} placeholder="请选择好友总数" >
              <Option key="1">全部</Option>
              <Option key="2">多到少</Option>
              <Option key="3">少到多</Option>
            </Select>
            </FormItem>
          </Col>
          <Col span={4}>
              <Button key="search" type="primary" icon="search" size="large" htmlType="submit">搜索</Button>
              <Button key="add" type="ghost" icon="plus" size="large" onClick={ this.handleAdd } style={{ marginLeft:24 }}>添加客服</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(CsmSearchForm);
