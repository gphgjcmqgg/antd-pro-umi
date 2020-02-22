import React from 'react';
import './index.less';
import ABSPerfectScrollBar from '../ABSPerfectScrollBar';

export interface IABSDescriptionHeaderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
  removeScrollBar?: boolean;
}
 
class ABSDescriptionHeader extends React.Component<IABSDescriptionHeaderProps> {
  renderContent() {
    const { children, removeScrollBar } = this.props;
    if (removeScrollBar) {
      return children;
    }
    return <ABSPerfectScrollBar>{children}</ABSPerfectScrollBar>;
  }
  render() { 
    const { style, title, className } = this.props;
    const classs = `abs-description-header-content ${className || ''}`;
    return (
      <div className="abs-description-header">
        <div className="abs-description-header-title">{title}</div>
        <div className={classs} style={style}>
          {
            this.renderContent()
          }
        </div>
      </div>
    );
  }
}
 
export default ABSDescriptionHeader;