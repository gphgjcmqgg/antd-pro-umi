import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

import { StateType } from './model';
import styles from './style.less';
import authService from '@/services/auth/authService';

const FormItem = Form.Item;

import { ABSInput } from '@/components/ABSInput';
import { ABSAntIcon } from '@/components/ABSAntIcon';
import PasswordInput from '@/components/ABSInput/passwordInput';
import ABSCaptcha from '@/components/ABSCaptcha';
import ABSMessage from '@/components/ABSMessage';
import commonUtils from '@/utils/commonUtils';

interface UserRegisterProps extends FormComponentProps {
  dispatch: any;
  userRegister: StateType;
  submitting: boolean;
}
interface UserRegisterState {
  count: number;
  confirmDirty: boolean;
  visible: boolean;
  help: string;
  isChange: boolean;
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  isChange: boolean;
}

class UserRegister extends Component<UserRegisterProps, UserRegisterState> {
  state: UserRegisterState = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    isChange: false,
  };

  interval: number | undefined = undefined;

  componentDidUpdate() {
    console.log("componentDidUpdate");
    // const { userRegister, form } = this.props;
    // const account = form.getFieldValue('mail');
    // if (userRegister.status === 'ok') {
    //   message.success('注册成功！');
    //   router.push({
    //     pathname: '/user/register-result',
    //     state: {
    //       account,
    //     },
    //   });
    // }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
          },
        }).then((response: any) => {
          if (!response) {
            return;
          }
          if (response.is_success) {
            //const { getClickUrl } = this.props;
            authService.setAuthCache(response.data);
            const params = commonUtils.getParams(); {
              if (params && params.return_url) {
                location.href = params.return_url.replace('*', '?').replace(/@/g, '&');
              } else {
                // if (getClickUrl) {
                //   const toClickUrl = getClickUrl();
                //   if (toClickUrl) {
                //     location.href = toClickUrl;
                //   } else {
                //     location.href = routerConfig.home;
                //   }
                // } else {
                //   location.href = routerConfig.home;
                // }
              }
            }
          } else {
            if (String(response.fail_msg).indexOf('验证码') === -1) {
              ABSMessage.error(response.fail_msg);
            } else {
              // this.errorMessage = response.fail_msg;
            }
            this.setState({ isChange: !this.state.isChange });
          }
        });
      }
    });
  };

  onDeleteBtn(e: any) {
    if (e.user_name) {
      this.props.form.setFieldsValue({
        user_name: '',
      });
    }
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { isChange} = this.state;
    const userName = this.props.form.getFieldsValue(['user_name']);
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="userlogin.login.login" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入用户名或手机号' }],
            })(
              <ABSInput
                placeholder="请输入用户名或手机号"
                getvalue={userName}
                deletBtn={() => this.onDeleteBtn(userName)}
                issuffix={true}
                prefix={<ABSAntIcon type="user" />}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <PasswordInput placeholder="请输入密码" prefix={<ABSAntIcon type="lock" />} />
            )}
          </FormItem>
          <FormItem className="form-item-captcha">
            {getFieldDecorator('captcha', {
              rules: [{
                required: true, message: '请输入验证码'
              }],
            })(
              <ABSInput
                placeholder="请输入验证码"
                type="text"
                addonAfter={<ABSCaptcha isChange={isChange} className="login-captcha" />}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="userlogin.login.login" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="userregister.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
    userRegister,
    loading,
  }: {
    userRegister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userRegister,
    submitting: loading.effects['userRegister/submit'],
  }),
)(Form.create<UserRegisterProps>()(UserRegister));
