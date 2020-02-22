import React from 'react';
import { Avatar } from 'antd';
import commonUtils from '../../utils/commonUtils';
import './index.less';
import classNames from 'classnames';

export declare type avatarSize = 'large' | 'small' | 'default' | 100 | 500;
export declare type avatarShape = 'circle' | 'square';

export interface IABSAvatarProps {
  size?: avatarSize;
  shape?: avatarShape;
  alt?: string;
  imageUrl: string | null;
  className?: string;
  onClick?: () => void;
  statusComponent?: React.ReactNode;
}

/**
 * 头像组件
 * @author jiaqi.qin
 * @author peng.wu
 */
export default class ABSAvatar extends React.Component<IABSAvatarProps> {
  static defaultProps = {
    size: 'large',
    shape: 'circle'
  };

  renderStatusComponent() {
    const { statusComponent } = this.props;
    return <div className="status-component-container">{statusComponent}</div>;
  }

  render() {
    const { alt, size, shape, imageUrl, onClick, className } = this.props;
    const clazzName = classNames('abs-avatar', className);
    return (
      <div className={clazzName} onClick={onClick}>
        <Avatar
          alt={alt}
          icon="user"
          className={`abs-avatar-icon-${size}`}
          size={size}
          shape={shape}
          src={commonUtils.getAvatar(imageUrl)}
        />
        {this.renderStatusComponent()}
      </div>
    );
  }
}
