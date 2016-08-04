/*添加、修改客服号弹出框*/
import React, { Component, PropTypes} from 'react'
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;
class EditCmsModal extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onRefreshTable: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('EditCmsModal => componentWillReceiveProps =>');
    if(!this.state.visible && nextProps.title) {
      this.setState({visible: true });
    }
  }

  handleCancel() {
    this.setState({ visible: false });
    this.props.onRefreshTable();
    this.props.form.resetFields();  //清空数据
  }

  handleOk() {
    this.setState({ loading: true });

    this.props.form.validateFields( (errors, values) => {
      if(!!errors) {
        console.log('编辑客服 => 表单验证出错啦');
        this.setState({ loading: false });
        return;
      }

      values['id'] = this.props.data['id'];

      console.log('正在提交数据。。。', values);
      //模拟ajax提交数据
      setTimeout( () => {
        console.log('数据已提交，关闭对话框');
        this.setState({ visible: false, loading: false });
        this.props.onRefreshTable();
        this.props.form.resetFields();
      }, 2000);
    });
  }

  mobileValidate(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (!(/^1[3|4|5|8]\d{9}$/.test(value))){
          callback([new Error('输入的手机号格式不正确')]);
        } else {
          callback();
        }
      }, 500);
    }
  }

  render() {
    console.log('EditCmsModal => render =>');

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const { title, data } = this.props;

    const usernameProps = getFieldProps('name', {
      initialValue: data['name'],
      rules: [
        { required: true, message: '客服姓名不能为空' }
      ],
    });
    const mobileProps = getFieldProps('mobile', {
      initialValue: data['mobile'],
      rules: [
        { required: true, message: '请输入客服手机号' },
        { validator: this.mobileValidate}
      ],
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (

      <Modal title={this.props.title}
        visible={this.state.visible}
        confirmLoading={this.state.loading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="提交"
        cancelText="取消"
        maskClosable={false}>

        <Form horizontal form={this.props.form}>
          <FormItem {...formItemLayout} label="客服姓名" hasFeedback >
            <Input {...usernameProps} placeholder="请输入客服姓名" />
          </FormItem>
          <FormItem {...formItemLayout} label="客服手机号" hasFeedback>
            <Input {...mobileProps} placeholder="请输入客服手机号" />
          </FormItem>
        </Form>

      </Modal>
    );
  }
}

export default EditCmsModal = Form.create()(EditCmsModal);
