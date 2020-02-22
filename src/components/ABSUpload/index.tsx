import React, { Component } from 'react';
import './index.less';
import { Upload } from 'antd';
// import ABSIcon from '../ABSIcon';
import classnames from 'classnames';
import ABSIconText from '../ABSIconText';
import ABSMessage from '../ABSMessage';
import _ from 'lodash';
import ABSProgressBar from '../ABSProgressBar';
import commonUtils from '../../utils/commonUtils';
import { GlobalApi } from '../../abs/config/api';
import ABSFileTypeText from '../ABSFileTypeText';

interface IABSUploadProps {
  className?: string;
  enclosureClassName?: string;
  style?: React.CSSProperties;
  name?: string;
  icon?: string;
  iconText?: string;
  desc?: string;
  multiple?: boolean;
  beforeUpload?: () => boolean;
  // 是否是单个文件
  isSingle?: boolean;
  fileInfo?: any;
  // 立即上传文件获取code
  action?: string;
  // 大小默认是M为单位
  limitSize?: number;
  limitType?: any[];
  // 上传成功或者失败的处理
  onUpload?: (value: any) => void;
  required?: boolean;
  onDelete?: (value?: any) => void;
}

export const FileType = {
  image: ['png', 'jpg', 'jpeg'],
  file: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'zip', 'tar', 'rar'],
  document: ['doc', 'docx', 'pdf'],
  sheet: ['xls', 'xlsx'],
};

interface IABSUploadState {
  fileList: any[];
  progressValue: number;
}

const defaultProps = {
  name: '附件：',
  icon: 'attachment',
  iconText: '添加附件',
};

export default class ABSUpload extends Component<IABSUploadProps, IABSUploadState> {
  /** 上传进度，取值为 0~100（目前仅对上传单个文件有效） */
  public percent: number;

  private fileCode = '';

  constructor(props: any) {
    super(props);
    this.percent = 0;
    this.state = {
      fileList: [],
      progressValue: this.percent,
    };
  }

  componentWillMount() {
    const { fileInfo } = this.props;
    if (fileInfo) {
      const { code } = fileInfo;
      this.fileCode = code ? code : '';
      this.setState((prveState) => {
        const newFileList = prveState.fileList.slice();
        newFileList.push(fileInfo);
        return {
          fileList: newFileList,
        };
      });
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.fileInfo) {
      const nextFileInfoName = _.get(nextProps, 'fileInfo.name');
      const prevFileInfoName = _.get(this.state, 'fileList[0].name');

      // 如果上次和这次的文件名相同 则不push进数组
      if (prevFileInfoName !== nextFileInfoName) {
        this.setState((prveState) => {
          const newFileList = prveState.fileList.slice();
          newFileList.push(nextProps.fileInfo);
          return {
            fileList: newFileList,
          };
        });
      }
      if (this.state.fileList.length < 1) {
        if (nextProps.fileInfo) {
          const { code } = nextProps.fileInfo;
          this.fileCode = code ? code : '';
        }
      }
    }
  }

  onGetResult() {
    const { fileList } = this.state;
    if (!fileList || fileList.length < 1) {
      return [];
    }
    return this.state.fileList;
  }

  onGetFileCode() {
    return this.fileCode ? this.fileCode : '';
  }

  onGetFileInfo() {
    const { isSingle } = this.props;
    const { fileList } = this.state;
    if (isSingle) {
      return [
        {
          code: this.fileCode,
          name: fileList[0] ? fileList[0].name : '',
        },
      ];
    }
    return this.state.fileList;
  }

  onChange = (info: any) => {
    const { onUpload, isSingle } = this.props;
    if (onUpload) { onUpload(info); }
    const { event } = info;
    if (event && isSingle) {
      const { percent } = event;
      if (!isNaN(percent)) {
        this.percent = percent;
        this.setState({ progressValue: this.percent });
      }
    }

    if (info.file.status === 'done') {
      // ABSMessage.success(`${info.file.name}上传成功！`);
      if (!info.file.response) { return; }
      if (!info.file.response[0].FileCode) { return; }
      this.fileCode = info.file.response[0].FileCode;
    } else if (info.file.status === 'error') {
      ABSMessage.error(`${info.file.name}上传失败！`);
    }
  }

  renderProps() {
    const { multiple, action, limitSize, limitType } = this.props;
    return {
      multiple: multiple,
      showUploadList: false,
      action: action,
      beforeUpload: (file) => {
        if (limitType && limitType.length > 0) {
          const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
          const isIn = limitType.indexOf(ext) >= 0;
          if (!isIn) {
            ABSMessage.error(`上传文件的类型不对，应该是${limitType.join()}`);
            return false;
          }
        }
        if (limitSize) {
          const { fileList } = this.state;
          let sizeTemp = 0;
          fileList.map((item: any) => {
            const { size } = item ? item : 0;
            sizeTemp += size;
          });
          const isMore = (file.size + sizeTemp) / (1024 * 1024) < limitSize;
          if (!isMore) {
            ABSMessage.error(`上传文件的大小不能超过${limitSize}M`);
            return false;
          }
        }
        this.setState(({ fileList }) => {
          if (fileList.length < 1) {
            const temp = fileList;
            temp.push(file);
            return { fileList: temp };
          }
          const newFileList = fileList.slice();
          newFileList.push(file);
          return { fileList: newFileList };
        });
        return action ? true : false;
      },
    };
  }

  // renderType(name: string) {
  //   if (!name) {
  //     return 'common-type';
  //   }
  //   const ext = name.split('.')[name.split('.').length - 1];
  //   if (ext === 'pdf') {
  //     return 'pdf';
  //   }
  //   if (ext === 'zip' || ext === 'tar' || ext === 'rar') {
  //     return 'zip';
  //   }
  //   if (ext === 'xls' || ext === 'xlsx') {
  //     return 'xls';
  //   }
  //   if (ext === 'ppt' || ext === 'pptx') {
  //     return 'ppt';
  //   }
  //   if (ext === 'doc' || ext === 'docx') {
  //     return 'word';
  //   }
  //   if (FileType.image.indexOf(ext) >= 0) {
  //     return 'pic';
  //   }
  //   return 'common-type';
  // }

  // renderSize(value: string) {
  //   if (null == value || value === '') {
  //     return '';
  //   }
  //   const unitArr = new Array('B', 'KB', 'MB');
  //   let index = 0;
  //   const srcsize = parseFloat(value);
  //   index = Math.floor(Math.log(srcsize) / Math.log(1024));
  //   const size = srcsize / Math.pow(1024, index);
  //   return size.toFixed(1) + unitArr[index];
  // }

  renderFileList() {
    const { fileList } = this.state;
    return fileList.map((item, index) => {
      const { name, size } = item ? item : '';
      const clazs = this.fileCode ? 'modal-download' : 'modal-files';
      return (
        <ABSFileTypeText 
          className={clazs} 
          key={index} 
          name={name} 
          size={size} 
          onDownloadFile={this.onDownloadFile} 
          onDelete={() => this.onDelete(index)}  
        />
        // <div className={clazs} key={index} onClick={this.onDownloadFile}>
        //   <ABSIcon className={`modal-files-image-${this.renderType(name)}`} type={this.renderType(name)} />
        //   <div className="modal-files-content">
        //     <p className="modal-files-content-title">{name}</p>
        //     <div className="modal-files-content-div" />
        //     <p className="modal-files-content-desc">{this.renderSize(size)}</p>
        //   </div>
        //   <ABSIcon className="modal-files-delete" type="circle-close-filled" onClick={() => this.onDelete(index)} />
        // </div>
      );
    });
  }

  renderStar() {
    const { required } = this.props;
    if (!required) { return null; }
    return (
      <span className="modal-content-star">*</span>
    );
  }

  renderProgress() {
    const { progressValue } = this.state;
    if (progressValue <= 0 || progressValue >= 100) { return null; }
    const percent = Math.round(progressValue);
    return (
      <ABSProgressBar
        percent={percent}
        status="active"
      />
    );
  }

  render() {
    const { enclosureClassName, className, style, name, icon, iconText, desc, isSingle } = this.props;
    const { fileList } = this.state;
    const clazs = classnames('modal', className);
    const enclosureClazs = classnames('modal-enclosure', enclosureClassName);
    const disabled = (fileList.length === 1 && isSingle) ? true : false;
    const disanledClassName = disabled ? 'modal-icon-disabled' : 'modal-icon';
    return (
      <div className={clazs} style={style}>
        <div className="modal-content">
          <span className={enclosureClazs}>
            {this.renderStar()}
            <span>{name ? name : defaultProps.name}</span>
          </span>
          <div>
            <div>
              <Upload {...this.renderProps()} disabled={disabled} onChange={this.onChange}>
                <div className={disanledClassName}>
                  <ABSIconText
                    icon={icon ? icon : defaultProps.icon}
                    text={iconText ? iconText : defaultProps.iconText}
                  />
                </div>
              </Upload>
              <span className="modal-enclosure_desc">{desc}</span>
            </div>
            {this.renderFileList()}
            {this.renderProgress()}
          </div>
        </div>
      </div >
    );
  }

  onDownloadFile = () => {
    if (this.fileCode) {
      commonUtils.downloadFile(`${GlobalApi.downloadFiles}${this.fileCode}`);
    }
  }

  onDelete = (index: number) => {
    const { isSingle } = this.props;
    if (isSingle) {
      this.fileCode = '';
    }
    this.setState(({ fileList }) => {
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete();
    }
  }
}