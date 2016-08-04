/*转移客服好友弹出框*/
import React, { Component, PropTypes} from 'react'
import { Form, InputNumber, Select, Button, Row, Col, Modal } from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin';
const FormItem = Form.Item;
const Option = Select.Option;

class TransferFrdsModal extends Component {

  static propTypes = {
    sourceId: PropTypes.number.isRequired,        //原始客服id
    onRefreshTable: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state={
      visible: false,  //控制modal是否显示
      loading: false
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('TransferFrdsModal => componentWillReceiveProps', nextProps);
    if(!this.state.visible && nextProps.sourceId > 0) {
      this.setState({visible: true });
    }
  }

  handleOk() {
    this.setState({ loading: true });

    setTimeout( () => {
      this.setState({ visible:false, loading: false });
      this.props.onRefreshTable();
      this.props.form.resetFields();
    }, 2000);
  }

  handleCancel() {
    this.setState({ visible:false });
    this.props.onRefreshTable();
    this.props.form.resetFields();
  }

  render() {
    console.log('TransferFrdsModal= > render => ', this.props.formValues);

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    const minFrdNum = 1000;
    const maxFrdNum = 50000;
    const opNum = 12;
    const peopleNum = 30500;

    return (
      <Modal title={this.props.title}
        visible={this.state.visible}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="提交"
        cancelText="取消"
        maskClosable={false}>

        <Form horizontal>
          <FormItem labelCol={{ span:8 }} wrapperCol={{ span:10　}} label="目标客服号">
            <Select {...getFieldProps('orig_group_num') } placeholder="请选择目标客服号">
              <Option key="1" value="11">商业渠道1</Option>
              <Option key="2" value="22">商业渠道2</Option>
              <Option key="3" value="33">商业渠道3</Option>
            </Select>
          </FormItem>
          <FormItem labelCol={{ span:8 }} wrapperCol={{ span:16　}} label="分配好友">
            <InputNumber min={1} step={1} size="large"  {...getFieldProps('friend_num', {initialValue:''})} placeholder="请输入分配好友数"  style={{ width: '40%' }}/>
            <span className="ant-form-text" style={{marginLeft: 8, marginRight:8 }}>人</span>
            <Button type="primary">全部</Button>
          </FormItem>
          <FormItem wrapperCol={{ span:16, offset: 6 }}>
            <p className="ant-form-text" id="static" name="static" style={{ 'color':'red' }}>可分配好友{maxFrdNum}人，最少分配{minFrdNum}人</p>
          </FormItem>
          <FormItem labelCol={{ span: 8, offset: 2 }} label="实际将分配好友">
            <p className="ant-form-text" id="static" name="static">来自<span style={{ 'color':'red' }}>{opNum}</span>个运营微信号，共<span style={{ 'color':'red' }}>{peopleNum}</span>人</p>
          </FormItem>
        </Form>

      </Modal>
    );
  }
}

export default Form.create()(TransferFrdsModal);
