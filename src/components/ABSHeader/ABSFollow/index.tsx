import * as React from 'react';
import ABSIconTooltip from '../../ABSIconTooltip';
import ABSLink from '../../ABSLink';
import './index.less';
import routeConfig from '../../../abs/config/routeConfig';

class ABSFollow extends React.Component<any, any> {
  render() {
    return (
      <div className="abs-follow">
        <ABSLink to={routeConfig.followDeal}>
          {/* <ABSIcon type="star-o" /> */}
          <ABSIconTooltip type="star-o" details="我的关注"/>
        </ABSLink>
      </div>
    );
  }
}

export default ABSFollow;