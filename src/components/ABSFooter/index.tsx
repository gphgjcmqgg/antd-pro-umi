import React from 'react';
import './index.less';
import { FILTER_DEFAULT_NOW_YEAR } from '../../utils/constant';
import ABSLink from '../ABSLink';

interface IABSFooterProps {
  
}

class ABSFooter extends React.Component<IABSFooterProps> {
  renderICPContent() {
    return <ABSLink to="http://www.beian.miit.gov.cn">沪ICP备15008941号</ABSLink>;
  }
  render() {
    return (
      <div className="abs-footer" style={{textAlign: "center"}}>
        © 2014 - {FILTER_DEFAULT_NOW_YEAR} 上海和逸信息科技服务有限公司版权所有 {this.renderICPContent()} 版本号：1.0
      </div>
    );
  }
}

export default ABSFooter;