import React from 'react';
import './ABSLoginIcon.less';
import { ABSAntIcon } from '../ABSAntIcon';
import classnames from 'classnames';

export interface IABSLoginIconProps {
  style?: React.CSSProperties;
  className?: string;
  type: string;
  onClick?: (event: React.MouseEvent<any>) => void;
}

class ABSLoginIcon extends React.Component<IABSLoginIconProps> {
  render() {
    const { style, className, onClick, type } = this.props;
    const classs = classnames('abs-ant-icon-l abs-other-login-content', className);
    return (
      <div className="abs-other-login-icon" onClick={onClick}>
        <ABSAntIcon className={classs} type={type} style={style} />
      </div>
    );
  }
}

export default ABSLoginIcon;