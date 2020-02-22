import React from 'react';
import classNames from 'classnames';
import ABSComment from '../ABSComment';
import './index.less';
import ABSLoading from '../ABSLoading';

export interface IABSPanelProps {
  title: React.ReactNode|string;
  // 是否去除内边距
  removePadding?: boolean;
  removeMargin?: 'top'| 'bottom'| 'both';
  hasBorder?: boolean;
  className?: string;
  style?: React.CSSProperties;
  comment?: React.ReactNode|string;
  actionButton?: React.ReactNode;
  // 是否正在加载
  loading?: boolean;
  // 背景颜色是否为黑色
  isBlackBackground?: boolean;
  contentClassName?: string;
}
 
class ABSPanel extends React.Component<IABSPanelProps> {
  static defaultProps = {
    removePadding: false,
  };

  renderLoading() {
    return <ABSLoading size="large" />;
  }

  renderContent() {
    const { loading, children } = this.props;
    if (loading) {
      return this.renderLoading();
    }
    return children;
  }

  render() {
    const { title, style, className, 
      removePadding, comment, loading, 
      contentClassName, isBlackBackground, 
      removeMargin, hasBorder,
      actionButton
    } = this.props;
    const classes = classNames('abs-panel', className, {
      'abs-panel-no-padding': removePadding,
      'abs-panel-loading': loading,
      'abs-panel-content-bg-black': isBlackBackground,
      'abs-panel-no-margin-top': removeMargin === 'top' || removeMargin === 'both',
      'abs-panel-no-margin-bottom': removeMargin === 'bottom' || removeMargin === 'both',
      'abs-panel-border': hasBorder || title === '筛选条件',
    });
    const contentClazzName = classNames('abs-panel-content', contentClassName);
    
    return (
      <div className={classes} style={style}>
        <div className="abs-panel-header">
          <div className="abs-panel-title">
            {title}
          </div>
          <div className="abs-panel-box">
            {comment ? <ABSComment>{comment}</ABSComment> : null}
            {actionButton ? <div className="abs-panel-box-button">{actionButton}</div> : null}
          </div>
        </div>
        <div className={contentClazzName}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
 
export default ABSPanel;