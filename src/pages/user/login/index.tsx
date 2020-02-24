import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

import styles from './style.less';
import authService from '@/services/auth/authService';

const FormItem = Form.Item;

import { ABSInput } from '@/components/ABSInput';
import { ABSAntIcon } from '@/components/ABSAntIcon';
import PasswordInput from '@/components/ABSInput/passwordInput';
import ABSCaptcha from '@/components/ABSCaptcha';
import ABSMessage from '@/components/ABSMessage';
import commonUtils from '@/utils/commonUtils';

interface UserLoginProps extends FormComponentProps {
  dispatch: any;
  submitting: boolean;
}
interface UserLoginState {
  isChange: boolean;
}

export interface UserLoginParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  isChange: boolean;
}

class UserLogin extends Component<UserLoginProps, UserLoginState> {
  state: UserLoginState = {
    isChange: false,
  };

  interval: number | undefined = undefined;

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
            authService.setAuthCache(response.data);
            const params = commonUtils.getParams(); {
              if (params && params.return_url) {
                location.href = params.return_url.replace('*', '?').replace(/@/g, '&');
              } else {
                router.push({ pathname: '/' });
              }
            }
          } else {
            ABSMessage.error(response.fail_msg);
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
                addonAfter={<ABSCaptcha isChange={isChange} className={styles.getCaptcha} />}
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
          </FormItem>
          <FormItem>
            <Link className={styles.forgetpass} to="/user/login">
                <FormattedMessage id="userlogin.login.forgot-password" />
            </Link>
            <Link className={styles.register} to="/user/login">
                <FormattedMessage id="userlogin.login.signup" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect(
  ({
    loading,
  }: {
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    submitting: loading.effects['login/login'],
  }),
)(Form.create<UserLoginProps>()(UserLogin));
