import * as React from 'react';
import './index.less';
import moment from 'moment';
import { connect } from 'dva';
import { Form, AutoComplete } from 'antd';
import ABSMessage from '../../../ABSMessage';
import { ABSInput } from '../../../ABSInput';
import { ABSButton } from '../../../ABSButton';
import ABSRangeDatePicker from '../../../ABSRangeDatePicker';
import ABSGlobalSearchField from '../../../ABSGlobalSearchField';
import { SearchType } from '../../../ABSGlobalSearchField/utils/enum';
import RouteConfig from '../../../../abs/config/routeConfig';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

interface IUserState {
  startValue?: moment.Moment;
  endValue?: moment.Moment;
  organization_name: string;
  organization_id: number;
}

class User extends React.Component<any, IUserState> {
  private submitCount: number = 0;
  constructor(props: any) {
    super(props);
    this.state = {
      startValue: undefined,
      endValue: undefined,
      organization_name: '',
      organization_id: 0,
    };
  }

  renderOption(item: any) {
    return (
      <Option key={item.title} title={item.title}>
        {item.title}
      </Option>
    );
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { startValue, endValue, organization_name } = this.state;
    return (
      <div className="abs-improve-user">
        <p className="abs-improve-user-title">{'完善基本信息'}</p>
        <Form onSubmit={this.onSubmit} className="abs-improve-form">
          <FormItem label="真实姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入您的真实姓名' }],
            })(
              <ABSInput
                className={'abs-improve-input'}
                placeholder="请输入您的真实姓名"
                type="text"
              />
            )}
          </FormItem>
          <FormItem label="机构名称">
            {getFieldDecorator('organization_name', {
              rules: [{ required: true, message: '请输入您的机构名称' }],
            })(
              <ABSGlobalSearchField
                className="abs-organization-name"
                defaultValue={organization_name}
                type={SearchType.organization}
                handleChange={this.onChange}
                placeholder="请输入您的机构名称"
              />
            )}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: '请输入您的邮箱'
              }, {
                type: 'email', message: '邮箱格式不正确'
              }],
            })(
              <ABSInput
                className={'abs-improve-input'}
                placeholder="请输入您的邮箱"
                type="text"
              />
            )}
          </FormItem>
          <FormItem label="所在部门">
            {getFieldDecorator('department')(
              <ABSInput
                className={'abs-improve-input'}
                placeholder="请输入您的所在部门"
                type="text"
              />
            )}
          </FormItem>
          <FormItem label="担任职位">
            {getFieldDecorator('position', {
              rules: [{ required: true, message: '请输入您的担任职位' }],
            })(
              <ABSInput
                className={'abs-improve-input'}
                placeholder="请输入您的担任职位"
                type="text"
              />
            )}
          </FormItem>
          <FormItem label="在职时间">
            {getFieldDecorator('time', {
              rules: [{ required: true, message: '请选择您的在职时间' }],
            })(
              <ABSRangeDatePicker
                startValue={startValue}
                endValue={endValue}
                onStartDateChange={this.onStartDateChange}
                onEndDateChange={this.onEndDateChange}
                splitStyle={{ width: 14, margin: '0 3px' }}
                hideTitle={true}
                size="large"
              />
            )}
          </FormItem>
          <FormItem className="abs-improve-user">
            <ABSButton htmlType="submit" className="abs-register-btn">完成，立即体验CNABS</ABSButton>
          </FormItem>
        </Form>
      </div>
    );
  }

  onStartDateChange = (value) => {
    this.setState(prveState => {
      this.onSelectTime(value, prveState.endValue);
      return {
        startValue: value,
      };
    });
  }

  onEndDateChange = (value) => {
    this.setState(prveState => {
      this.onSelectTime(prveState.startValue, value);
      return {
        endValue: value,
      };
    });
  }

  onSelectTime = (startValue, endValue) => {
    if (startValue && endValue) {
      this.onSetValue('time', startValue + endValue);
    }
  }

  onChange = (id, value, des) => {
    this.setState({ organization_id: id, organization_name: des });
    this.onSetValue('organization_name', des);
  }

  onSetValue = (type: any, value: any) => {
    if (!value) {
      return;
    }
    this.props.form.setFieldsValue({
      [`${type}`]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.submitCount > 0) {
          ABSMessage.error('请求发送中，不可重复点击');
          return;
        }
        this.submitCount = 1;
        this.onSaveUserProfile(values);
      }
    });
  }

  onSaveUserProfile(values: any) {
    const { dispatch } = this.props;
    const { organization_id, organization_name } = this.state;
    const { name, email, department, position } = values;
    dispatch({
      type: 'account/getAccountProfileUpdate',
      payload: {
        name,
        email,
        position,
        department,
        organization_id,
        company: organization_name,
        gender: '',
        address: '',
        telephone: '',
      }
    }).then((response) => {
      if (response && response.is_success) {
        this.onSaveUserWorksProfile(values);
        return;
      }
      this.submitCount = 0;
      ABSMessage.error(response.fail_msg);
    }).catch((error) => {
      this.submitCount = 0;
    });
  }

  onSaveUserWorksProfile(values: any) {
    const { startValue, endValue, organization_id, organization_name } = this.state;
    const { department, position } = values;
    const { dispatch } = this.props;
    dispatch({
      type: 'account/getWorksUpdate',
      payload: {
        id: 0,
        organization_id,
        company: organization_name,
        department,
        position,
        start_date: startValue ? startValue.format('YYYY-MM-DD') : null,
        end_date: endValue ? endValue.format('YYYY-MM-DD') : null,
        content: ''
      }
    }).then((response) => {
      if (response && response.is_success) {
        location.href = RouteConfig.userProfile;
        return;
      }
      this.submitCount = 0;
      if (response) {
        ABSMessage.error(response);
      }
    }).catch((error) => {
      this.submitCount = 0;
    });
  }
}

function mapStateToProps(state: any) {
  return { ...state.account };
}

export default connect(mapStateToProps)(Form.create()(User)); 