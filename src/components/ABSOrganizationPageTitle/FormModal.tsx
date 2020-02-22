import React from 'react';
import './FormModal.less';
import { ABSModal } from '../ABSModal';
import { ABSInput } from '../ABSInput';
import ABSMessage from '../ABSMessage';
import { ABSButton } from '../ABSButton';
import { ABSUploadImage } from '../ABSUploadImage';
import ABSComment from '../ABSComment';

export interface IFormModalProps {
  organizationCore: any;
  onSave: (value: any) => void;
}

export interface IFormModalState {
  name: string;
  shortName: string;
  contact: string;
  website: string;
  logo: string;
  uid: string;
}

const FORMTYPE = {
  Text: 1,
  TextArea: 2,
  Image: 3,
};

class FormModal extends React.Component<IFormModalProps, IFormModalState> {
  private modal: ABSModal | null;

  private isDelete: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      shortName: '',
      contact: '',
      website: '',
      logo: '',
      uid: '1',
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.organizationCore && nextProps.organizationCore.id !== this.props.organizationCore.id) {
      const { website, contact, short_name, full_name } = nextProps.organizationCore;
      this.setState({
        name: full_name,
        shortName: short_name,
        contact,
        website,
      });
    }
  }

  toggle() {
    if (this.modal) {
      this.modal.setState(prveState => { return { visible: !prveState.visible }; });
      if (!this.modal.state.visible) {
        const { website, contact, short_name, full_name } = this.props.organizationCore;
        this.setState(prveState => {
          return {
            name: full_name,
            shortName: short_name,
            contact,
            website,
            uid: this.isDelete ? prveState.uid : `${Math.random()}`
          };
        });
        this.isDelete = false;
      }
    }
  }

  renderItem(name: string, value: string, isrequire: boolean, onChange: (text: string) => void, type?: Number) {
    let rightView: any = null;
    switch (type) {
      case FORMTYPE.Text:
        rightView = <ABSInput placeholder={`请输入${name}`} size="default" onChange={text => onChange(text)} value={value} />;
        break;
      case FORMTYPE.TextArea:
        rightView = <ABSInput style={{ height: 125 }} placeholder={`请输入${name}`} size="default" onChange={text => onChange(text)} value={value} autosize={true} />;
        break;
      case FORMTYPE.Image:
        const { logo_file_url } = this.props.organizationCore;
        const { uid } = this.state;
        const fileList = logo_file_url ? [{ uid: `${uid}`, status: 'done', name: '', url: logo_file_url }] : [];
        rightView = <div className="organization-modal-logo"><ABSUploadImage description="点击上传机构标识" updateFileCode={fileCode => this.onUpdateFileCode(fileCode)} fileList={this.isDelete ? [] : fileList} onRemove={this.onRemove} /><ABSComment className="organization-modal-logo-info"><span className="abs-hasStar">建议尺寸280px x 100px, 不透明背景</span></ABSComment></div>;
        break;
      default:
        rightView = <ABSInput placeholder={`请输入${name}`} size="default" onChange={text => onChange(text)} value={value} />;
        break;
    }
    return (
      <div className="organization-modal-input" >
        <p className="organization-modal-input-name">
          {isrequire ? <span className="organization-base-title-star">*</span> : null}
          <span className="organization-base-title-text">{name}</span>
        </p>
        <div className="organization-modal-input-content">
          {rightView}
        </div>
      </div>
    );
  }

  renderContent() {
    const { name, shortName, contact, website } = this.state;
    return (
      <div>
        {this.renderItem('机构全称', name, true, (text) => this.setState({ name: text }))}
        {this.renderItem('机构简称', shortName, true, (text) => this.setState({ shortName: text }))}
        {this.renderItem('联系方式', contact, true, (text) => this.setState({ contact: text }), FORMTYPE.TextArea)}
        {this.renderItem('机构网址', website, false, (text) => this.setState({ website: text }))}
        {this.renderItem('机构标识', website, false, (text) => null, FORMTYPE.Image)}
      </div>
    );
  }

  render() {
    return (
      <ABSModal
        content={this.renderContent()}
        title="编辑机构基本信息"
        width={680}
        ref={view => this.modal = view}
        footer={
          [
            <ABSButton
              onClick={this.onSave}
              key="submit" type="primary" className="" icon="check"
            >确定</ABSButton>,
            <ABSButton
              onClick={() => this.toggle()}
              key="return" type="default" className="abs-btn-gap-left" icon="close"
            >取消</ABSButton>
          ]}
      />
    );
  }

  onRemove = () => {
    this.isDelete = true;
  }

  onUpdateFileCode = (fileCode: string) => {
    if (fileCode) {
      this.setState({ logo: fileCode });
    }
  }

  onSave = () => {
    const { name, shortName, contact, website, logo } = this.state;
    if (!name) {
      ABSMessage.error('请输入机构全称');
      return;
    }
    if (!shortName) {
      ABSMessage.error('请输入机构简称');
      return;
    }
    if (!contact) {
      ABSMessage.error('请输入联系方式');
      return;
    }
    const { organizationCore } = this.props;
    const params: any = {};
    params.name = name;
    params.short_name = shortName;
    params.contact = contact;
    params.website = website;
    params.file_code = logo;
    params.id = organizationCore.id;
    params.organization_id = organizationCore.id;
    const { onSave } = this.props;
    if (onSave) {
      onSave(params);
    }
  }
}

export default FormModal;