import React from 'react';
import './index.less';
import ABSPanel from '../ABSPanel';

export interface IABSPanelFlexContainerProps {
  title: string;
  // 是否去除内边距
  removePadding?: boolean;
  removeMargin?: 'top' | 'bottom' | 'both';
  hasBorder?: boolean;
  className?: string;
  panelClassName?: string;
  style?: React.CSSProperties;
  comment?: React.ReactNode | string;
  actionButton?: React.ReactNode;
  // 是否正在加载
  loading?: boolean;
  // 背景颜色是否为黑色
  isBlackBackground?: boolean;
  contentClassName?: string;
  panelContent: React.ReactNode | string;
}

export default class ABSPanelFlexContainer extends React.Component<IABSPanelFlexContainerProps> {
  render() {
    const { 
      className, children, panelClassName, 
      removeMargin, removePadding, hasBorder,
      style, comment, actionButton, loading,
      isBlackBackground, contentClassName,
      title, panelContent
    } = this.props;
    const classs = `abs-panel-flex-container ${className || ''}`;
    const panelClasss = `abs-panel-flex-container-panel ${panelClassName || ''}`;
    return (
      <div className={classs}>
        <div className="abs-panel-flex-container-content">{children}</div>
        <ABSPanel 
          title={title}
          className={panelClasss} 
          removePadding={removePadding} 
          hasBorder={hasBorder}
          removeMargin={removeMargin}
          style={style}
          comment={comment} 
          actionButton={actionButton}
          loading={loading}
          isBlackBackground={isBlackBackground}
          contentClassName={contentClassName}
        >
          {panelContent}
        </ABSPanel>
      </div>
    );
  }
}
