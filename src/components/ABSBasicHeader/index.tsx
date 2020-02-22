import * as React from 'react';
import { withRouter } from 'dva/router';
import './index.less';

const logo = require('../../assets/images/logo.png');
// const ChristmasHat = require('../../assets/images/hat.png');
class ABSBasicHeader extends React.Component<any, any> {
  render() {
    return (
      <div className={'abs-basic-header'}>
        <div className="abs-basic-header-logo">
          <a href="/">
            {/* <img className="abs-Christmas-hat" src={ChristmasHat} /> */}
            <img className="abs-basic-header-logo-img" src={logo} />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(ABSBasicHeader);