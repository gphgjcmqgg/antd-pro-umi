import React from 'react';
import ABSForm, { IControls } from '../ABSForm';
import { ABSModal } from '../ABSModal';
import classNames from 'classnames';
import { connect } from 'dva';
import ABSMessage from '../ABSMessage';
import _ from 'lodash';
import './index.less';

interface IABSFormModalProps {
  controls: IControls[];
  title?: string;
  labelWidth?: number;
  wrapperWidth?: number;
  width?: number;
  beforeSend?: (values: any) => any;
  actionType: string;
  afterDispatch?: (response: any, values: any) => any;
  dispatch: any;
  destroyOnClose?: boolean;
  okText?: string;
}

class ABSFormModal extends React.Component<IABSFormModalProps, any> {
  static defaultProps = {
    width: 420
  };

  formRef;
  modal;

  showModal = () => {
    this.modal.setState({ visible: true });
  };

  closeModal = () => {
    // const form = this.formRef.props.form;
    // console.log(this.modal);
    // form.resetFields();
    // console.log(this.modal);
    this.modal.setState({ visible: false });
  };

  onSuccessCallback = () => {
    const form = this.formRef.props.form;
    const { beforeSend, actionType, dispatch, afterDispatch } = this.props;
    return form.validateFields((err, values) => {
      if (!err) {
        let payload = values;
        if (beforeSend) {
          const p = beforeSend(values);
          payload = p ? p : values;
        }
        dispatch({
          type: actionType,
          payload
        }).then(res => {
          const isSuccess = _.get(res, 'is_success', false);
          if (isSuccess) {
            this.closeModal();
            if (afterDispatch) {
              afterDispatch(res, values);
            } else {
              ABSMessage.success('发送成功');
            }
          } else {
            ABSMessage.error(res);
          }
        });
      }
    });

    // this.props.onConfirm(values);
    // form.resetFields();
    // this.modal.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    const {
      controls,
      title,
      width,
      labelWidth,
      wrapperWidth,
      children,
      destroyOnClose,
      okText
    } = this.props;
    const clazz = classNames({ noTitleFormMargin: !title });
    return (
      <div className="abs-form-modal">
        {children}
        <ABSModal
          content={
            <ABSForm
              className={clazz}
              controls={controls}
              wrappedComponentRef={this.saveFormRef}
              labelWidth={labelWidth}
              wrapperWidth={wrapperWidth}
              disableTextAreaResize={true}
            />
          }
          title={title}
          width={width!}
          okText={okText!}
          onSuccessCallback={this.onSuccessCallback}
          ref={view => (this.modal = view)}
          destroyOnClose={destroyOnClose}
          wrapClassName="abs-form-modal-wrapper"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ABSFormModal);
