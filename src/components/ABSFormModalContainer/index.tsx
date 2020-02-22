import React from 'react';
import ABSFormModal from '../ABSFormModal';
import { formatPayload } from '../ABSFormModal/util';
import { IControls } from '../ABSForm';
import ABSFormModalContainerDataHelper from './ABSFormModalContainerDataHelper';
import authService from '../../abs/services/auth/authService';
import RouteConfig from '../../abs/config/routeConfig';

export interface IABSFormModalContainerProps {
  controls: IControls[];
  title: string;
  destroyOnClose?: boolean;
  width?: number;
}

export interface IABSFormModalContainerState {}

class ABSFormModalContainer extends React.Component<
  IABSFormModalContainerProps,
  IABSFormModalContainerState
> {
  static defaultProps = {
    destroyOnClose: true,
    width: 800
  };

  sendModal;

  formatSendInternalMessage = (values: any) => {
    return formatPayload(values);
  };

  openModal() {
    const isLogin = authService.checkIsLogin();
    if (isLogin) {
      this.sendModal.getWrappedInstance().showModal();
      return;
    }
    location.href = RouteConfig.login + '?return_url=' + window.location.href.replace('?', '*').replace(/&/g, '@');
  }

  render() {
    const { children, controls, title, destroyOnClose, width } = this.props;
    return (
      <ABSFormModal
        controls={ABSFormModalContainerDataHelper.formatControls(controls)}
        actionType="account/submitInternalMessage"
        title={title}
        okText="发送"
        width={width}
        ref={view => (this.sendModal = view)}
        beforeSend={this.formatSendInternalMessage}
        destroyOnClose={destroyOnClose}
      >
        {children}
      </ABSFormModal>
    );
  }
}

export default ABSFormModalContainer;
