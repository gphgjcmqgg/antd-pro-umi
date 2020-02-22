import React from 'react';
import './index.less';
import classNames from 'classnames';
import ABSContainer from '../../ABSContainer';
import { ABSButton } from '../../ABSButton';

export interface IContainerProps {
  onConfirm: (event: any) => void;
  onClose: (flag: boolean) => void;
  onCancel: () => void;
  className: string;
}

export interface IContainerState {
  hide: boolean;
}

/**
 * 筛选面板（竖向）容器组件
 * @author peng.wu
 * @author dong.li
 */
class Container extends React.PureComponent<IContainerProps, IContainerState> {
  state = { hide: false };

  render() {
    const { children, className } = this.props;
    const { hide } = this.state;
    const panelLeftStyle = classNames('abs-filter-panel-left', { 'abs-filter-panel-left-hide': hide });
    return (
      <div className={`abs-filter-panel ${className}`}>
        <div className={panelLeftStyle}>
          {this.renderHeader()}
          <ABSContainer className="abs-filter-panel-content" removePadding={true}>
            <div className="abs-filter-panel-content-spacing">
              {children}
            </div>
          </ABSContainer>
          {this.renderAction()}
        </div>
        {this.renderSwitchButton()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="abs-filter-panel-tip">
        <div className="abs-filter-panel-tip-dot" />
        <span>筛选条件</span>
      </div>
    );
  }

  renderAction() {
    const { onConfirm } = this.props;
    return (
      <div className="abs-filter-panel-bottom">
        <ABSButton
          onClick={onConfirm}
          icon="check"
          style={{ marginRight: 10 }}
        >
          确认
        </ABSButton>
        <ABSButton
          onClick={this.onCancel}
          icon="close"
          type="default"
        >
          取消
        </ABSButton>
      </div>
    );
  }

  renderSwitchButton() {
    const { hide } = this.state;
    const switchBtnStyle = classNames('abs-filter-panel-right-button', { 'abs-filter-panel-right-button-hide': hide });
    return (
      <div className="abs-filter-panel-right">
        <div className={switchBtnStyle} onClick={this.switchPanel} />
      </div>
    );
  }

  /**
   * 取消按钮点击回调
   */
  private onCancel = (event: any) => {
    const { onCancel } = this.props;
    onCancel();
  }

  /**
   * 隐藏/显示筛选面板按钮点击回调
   */
  private switchPanel = () => {
    const { onClose } = this.props;
    onClose(!this.state.hide);
    this.setState((prevState) => ({ hide: !prevState.hide }));
  }
}

export default Container;