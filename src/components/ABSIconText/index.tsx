import React from 'react';
import ABSIcon from '../ABSIcon';
import { ABSAntIcon } from '../ABSAntIcon';
import classNames from 'classnames';
import './index.less';

export interface IABSIconTextProps {
  icon: string;
  text: string;
  theme?: 'filled' | 'outlined' | 'twoTone';
  style?: React.CSSProperties;
  className?: string;
  isAnt?: boolean;
  containerClassName?: string;
  onClick?: (event: React.MouseEvent<any>) => void;
  fontSize?: 's'|'m'|'l';
}

export interface IABSIconTextState {

}

class ABSIconText extends React.Component<IABSIconTextProps, IABSIconTextState> {
  render() {
    const { className, isAnt, icon, text, onClick, containerClassName, fontSize, theme, style } = this.props;
    const fontClassName = fontSize ? `abs-font-${fontSize}` : 'abs-font-m';
    const classes = classNames('abs-ant-icon-text', containerClassName, fontClassName );
    return (
      <div className={classes} onClick={onClick}>
        {
          isAnt ?
            <ABSAntIcon className={className} type={icon} theme={theme} style={style}/>
            :
            <ABSIcon className={className} type={icon} />
        }
        <span className="abs-ant-icon-text-title">{text}</span>
      </div>
    );
  }
}

export default ABSIconText;