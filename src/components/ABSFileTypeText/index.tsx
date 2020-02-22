import React from 'react';
import classNames from 'classnames';
import './index.less';
import { UseType, FileType } from './util';
import ABSIcon from '../ABSIcon';

export interface IABSFileTypeTextProps {
  useType?: UseType;
  // fileType: string;
  className?: string;
  style?: React.CSSProperties;
  onDownloadFile?: () => void; 
  onDelete?: () => void;
  key?: number;
  size?: string;
  name: string;
}

class ABSFileTypeText extends React.Component<IABSFileTypeTextProps> {
  public static defaultProps = {
    useType: 'upload',
  };
  // constructor(props: any) {
  //   super(props);
  // }

  renderType(name: string) {
    if (!name) {
      return 'common-type';
    }
    const ext = name.split('.')[name.split('.').length - 1];
    if (ext === 'pdf') {
      return 'pdf';
    }
    if (ext === 'zip' || ext === 'tar' || ext === 'rar') {
      return 'zip';
    }
    if (ext === 'xls' || ext === 'xlsx') {
      return 'xls';
    }
    if (ext === 'ppt' || ext === 'pptx') {
      return 'ppt';
    }
    if (ext === 'doc' || ext === 'docx') {
      return 'word';
    }
    if (FileType.image.indexOf(ext) >= 0) {
      return 'pic';
    }
    return 'common-type';
  }

  renderSize(value?: string) {
    if (!value) {
      return '';
    }
    const unitArr = new Array('B', 'KB', 'MB');
    let index = 0;
    const srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    const size = srcsize / Math.pow(1024, index);
    return size.toFixed(1) + unitArr[index];
  }

  render() {
    const { useType, className, onDownloadFile, key, size, name, onDelete } = this.props;
    const classes = classNames(`abs-${useType}-file-text`, className);
    if (useType === 'upload') {
      return (
        <div className={classes} key={key} onClick={onDownloadFile}>
          <ABSIcon className={`abs-file-text-image abs-file-text-image-${this.renderType(name)}`} type={this.renderType(name)} />
          <div className="abs-file-text-content">
            <p className="abs-file-text-content-title">{name}</p>
            <div className="abs-file-text-content-div" />
            <p className="abs-file-text-content-desc">{this.renderSize(size)}</p>
          </div>
          <ABSIcon className="abs-file-text-delete" type="circle-close-filled" onClick={onDelete} />
        </div>
      );
    }
    return (
      <div className={classes} key={key} onClick={onDownloadFile}>
        <ABSIcon type={this.renderType(name)} className={`abs-file-text-image abs-file-text-image-${this.renderType(name)}`} />
        <div className="abs-file-text-content-title">{name}</div>
      </div>
    );
  }
}

export default ABSFileTypeText;