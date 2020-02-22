import React from 'react';
import { BackTop } from 'antd';
import ABSIcon from '../ABSIcon';
import './index.less';

export interface IABSBackTopProps {
  dom: HTMLElement | null;
  isContent?: any;
  visibilityHeight?: number;
  shareContent?: React.ReactNode;
}

class ABSBackTop extends React.Component<IABSBackTopProps> {
  defaultProps = {
    visibilityHeight: 0
  };

  getTarget = () => {
    const { dom } = this.props;
    return dom as HTMLElement;
  };

  renderContent() {
    const { isContent, visibilityHeight, dom, shareContent } = this.props;
    if (dom == null) {
      return null;
    }
    return (
      <BackTop target={this.getTarget} visibilityHeight={visibilityHeight}>
        {shareContent}
        <div className="ant-back-top-inner">
          {isContent ? '回到顶部' : ''}
          <ABSIcon type="prev-one" />
        </div>
      </BackTop>
    );
  }

  render() {
    return <div className="abs-back-top">{this.renderContent()}</div>;
  }
}

export default ABSBackTop;
