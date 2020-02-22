import React from 'react';
import ABSIcon from '../ABSIcon';
import './index.less';
import { getExt } from './util';

export interface IABSAttachmentProps {
  onClick?: () => void;
  fileName: string;
}
 
export interface IABSAttachmentState {
  
}
 
class ABSAttachment extends React.Component<IABSAttachmentProps, IABSAttachmentState> {
  render() { 
    const { onClick, fileName } = this.props;
    const newFilename = fileName == null ? '下载' : fileName;
    const ext = getExt(newFilename);
    
    return (
      <div className="abs-attachment" onClick={onClick}>
        <ABSIcon className={`item-file-image-${ext}`} type={ext} />
        <span>{fileName}</span>
      </div>
    );
  }
}
 
export default ABSAttachment;