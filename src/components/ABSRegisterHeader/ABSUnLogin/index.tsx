import * as React from 'react';
import './index.less';
import routerConfig from '../../../abs/config/routeConfig';
import ABSLink from '../../ABSLink';
import ABSIconText from '../../ABSIconText';

class ABSUnLogin extends React.Component<any, any> {

  onGoHelp = () => {
    location.href = routerConfig.feedback;
  }

  render() {
    return (
      <div className="abs-unlogin">
        <span className={'hasLogin'}>已有CNABS登录账号?</span>
        <ABSLink to={routerConfig.login}>点击登录</ABSLink>
        <ABSIconText icon="question-o" text="帮助" containerClassName="abs-unlogin-help" onClick={this.onGoHelp} />
      </div>
    );
  }
}

export default ABSUnLogin; 