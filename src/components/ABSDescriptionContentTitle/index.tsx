import React from 'react';
import ABSParagraph from '../ABSParagraph';
import './index.less';

export interface IABSDescriptionContentTitleProps {
  style?: React.CSSProperties;
  title?: string;
  description?: string | React.ReactNode;
  className?: string;
}
 
class ABSDescriptionContentTitle extends React.Component<IABSDescriptionContentTitleProps> {
  render() { 
    const { style, title, className, description, children } = this.props;
    const classs = `abs-description-content ${className || ''}`;
    const titleShow = title ? <div className="abs-description-content-title">{title}</div> : '';
    const descriptionShow = description ? <ABSParagraph>{description}</ABSParagraph> : '';
    return (
      <div className={classs} style={style}>
        {titleShow}
        {descriptionShow}
        <div className="abs-description-content-box">{children}</div>
      </div>
    );
  }
}
 
export default ABSDescriptionContentTitle;