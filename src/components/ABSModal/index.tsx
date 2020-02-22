import React from 'react';
import { Modal } from 'antd';
import './index.less';
import { ABSButton } from '../ABSButton';
import ABSPerfectScrollBar from '../ABSPerfectScrollBar';
import classNames from 'classnames';

export interface IABSModalProps {
  className?: string;
  content: React.ReactNode;
  title?: string;
  width: number;
  footer?: React.ReactNode | null;
  // 成功之后的回调
  onSuccessCallback?: () => boolean | void;
  removePaddingX?: boolean;
  destroyOnClose?: boolean;
  centered?: boolean;
  wrapClassName?: string;
  okText?: string;
  getContainer?: any;
  onCancel?: any;
  zIndex?: number;
  maskClosable?: boolean;
  closable?: boolean;
  keyboard?: boolean;
}

export interface IABSModalStates {
  visible: boolean;
}

export class ABSModal extends React.Component<IABSModalProps, IABSModalStates> {
  static defaultProps = {
    okText: '确认',
    keyboard: true,
  };

  constructor(props: IABSModalProps) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleOK = () => {
    const { onSuccessCallback } = this.props;
    if (onSuccessCallback && typeof onSuccessCallback === 'function') {
      let result = onSuccessCallback();
      if (!result) {
        this.setState({ visible: false });
      }
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
    this.setState({ visible: false });
  };

  renderFooter() {
    const { okText } = this.props;
    return this.props.footer
      ? this.props.footer
      : this.props.footer == null && this.props.footer !== undefined
      ? null
      : [
          // tslint:disable-next-line:jsx-wrap-multiline
          <ABSButton
            key="submit"
            type="primary"
            className=""
            onClick={this.handleOK}
            icon="check"
          >
            {okText}
          </ABSButton>,
          // tslint:disable-next-line:jsx-wrap-multiline
          <ABSButton
            key="return"
            type="default"
            className="abs-btn-gap-left"
            onClick={this.handleCancel}
            icon="close"
          >
            取消
          </ABSButton>
        ];
  }

  render() {
    const {
      content,
      title,
      width,
      className,
      footer,
      removePaddingX,
      destroyOnClose,
      centered,
      wrapClassName,
      getContainer,
      maskClosable,
      closable,
      keyboard,
      zIndex
    } = this.props;
    const { visible } = this.state;
    // 防止width超界
    const modalWidth = width > 0 && width <= 1000 ? width : 330;
    const classes = classNames('abs-modal-default', className);
    const containerClasses = classNames('abs-modal-body-scrollbar', {
      'abs-modal-body-nofooter-scrollbar': footer === null,
      nopaddingx: removePaddingX
    });
    return (
      <div className="abs-modal">
        <Modal
          title={title}
          visible={visible}
          width={modalWidth}
          keyboard={keyboard}
          onCancel={this.handleCancel}
          footer={this.renderFooter()}
          className={classes}
          closable={closable}
          maskClosable={maskClosable}
          destroyOnClose={destroyOnClose}
          centered={centered}
          wrapClassName={wrapClassName}
          getContainer={getContainer}
          zIndex={zIndex}
        >
          <ABSPerfectScrollBar>
            <div className={containerClasses}>
              <div>{content}</div>
            </div>
          </ABSPerfectScrollBar>
        </Modal>
      </div>
    );
  }
}
