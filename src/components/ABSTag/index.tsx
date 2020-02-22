import React from 'react';
import { Tag } from 'antd';
import './index.less';

export interface IABSTagProps {
  size?: string;
  color: string;
  content: string;
  visible?: boolean | undefined | null;
}

export class ABSTag extends React.Component<IABSTagProps> {
  render() {
    const { size, color, content, visible } = this.props;
    const Tagclass = visible ? '' : 'abs-tag-hidden';
    return (
      <div className={`abs-tag ${Tagclass}`}>
        <Tag
          color={color}
          visible={visible ? visible : false}
          className={`abs-tag-${size}`}
        >
          {content}
        </Tag>
      </div>
    );
  }
}
