import React from 'react';
import ABSUpload from '../ABSUpload';
import ABSContainer from '../ABSContainer';
// import { ABSButton } from '../ABSButton';
import { Row } from 'antd';
import { ABSInput } from '../ABSInput';
// import ABSMyAttentionHeader from '../../abs/views/account/MyAttention/Header';
// import RouterConfig from '../../abs/config/routeConfig';
import './index.less';
import { GlobalApi } from '../../abs/config/api';

export interface IABSNormalModalResult {
  content: string;
  attachment: string;
}
export interface IABSNormalModalProps {
  dispatch?: any;
  subTitle: string;
  placeholder: string;
}
 
export interface IABSNormalModalState {
  input: string;
  inputlength: string;
  isShowInputError: boolean;
  isShowLengthError: boolean;
}
 
class ABSNormalModal extends React.Component<IABSNormalModalProps, IABSNormalModalState> {
  static defaultProps = {
    subTitle: '请把您遇到的问题详情告诉我们',
    placeholder: '请描述您遇到的问题详情，或直接联系我们：电话：021-31156258 邮箱：feedback@cn-abs.com',
  };

  private upload: ABSUpload | null;
  
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
      inputlength: '0',
      isShowInputError: false,
      isShowLengthError: false,
    };
  }

  getModalResult(): IABSNormalModalResult {
    const { input, isShowInputError, isShowLengthError } = this.state;
    // if (input === '') {
    //   this.setState({
    //     isShowInputError: true,
    //   });
    // }

    if (!isShowInputError && !isShowLengthError && input !== '') {
      const fileCode = this.upload ? this.upload.onGetFileCode() : '';
      
      return {
        content: input,
        attachment: fileCode
      };
    }
    return {
      content: '',
      attachment: '',
    };
  }

  onChange = (e) => {
    if (e.length > 2000) {
      this.setState({
        input: e,
        inputlength: e.length,
        isShowInputError: false,
        isShowLengthError: true,
      });
    } else if (e.length === 0) {
      this.setState({
        input: e,
        inputlength: e.length,
        isShowInputError: true,
        isShowLengthError: false,
      });
    } else {
      this.setState({
        input: e,
        inputlength: e.length,
        isShowInputError: false,
        isShowLengthError: false,
      });
    }
  }
  
  renderInputError() {
    const { isShowInputError, isShowLengthError } = this.state;
    if (isShowInputError) {
      return <div className="abs-input-error">请输入意见</div>;
    }
    if (isShowLengthError) {
      return <div className="abs-input-error">输入长度不能超过2000</div>;
    }
    return null;
  }

  render() {
    const { subTitle, placeholder } = this.props;
    const { input, inputlength } = this.state;
    return (
      <ABSContainer className="abs-normal-modal" removePerfectScrollBar={true}>
        {/* <ABSMyAttentionHeader title={title} /> */}
        <div className="abs-form ">
          <Row className="abs-form-title">
            {subTitle}
          </Row>
          <Row style={{ marginBottom: 2 }}>
            <div className="fist-form-feedback">
              <div style={{ flexDirection: 'row', position: 'relative' }} className="input-view">
                <ABSInput
                  className="abs-domestic-input"
                  placeholder={placeholder}
                  type="text"
                  autosize={true}
                  style={{ height: 400, borderRadius: 10 }}
                  onChange={this.onChange}
                  value={input}
                />
                <div className="input-childen">{`${inputlength}/2000`}</div>
              </div>
            </div>
          </Row>
          <Row style={{ marginBottom: 12 }}>
            {this.renderInputError()}
          </Row>
          <Row style={{ marginBottom: 12 }} className="abs-form-attachment">
            <ABSUpload isSingle={true} action={GlobalApi.uploadUrl} ref={view => this.upload = view} limitSize={20} desc="（*文件大小在20M以内）" />
            {/* <ABSButton onClick={this.onSubmit} icon="check">确定</ABSButton> */}
          </Row>
        </div>
      </ABSContainer>
    );
  }
}
 
export default ABSNormalModal;