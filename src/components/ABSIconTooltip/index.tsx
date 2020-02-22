import * as React from 'react';
import { ABSAntIcon } from '../ABSAntIcon';
import ABSIcon from '../ABSIcon';
import { Tooltip } from 'antd';
import '../ABSBubble/index.less';
import './index.less';

export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface IAppProps {
  text?: string|React.ReactNode;
  details: string|React.ReactNode;
  antType?: string;
  type?: string;
  width?: number;
  placement?: TooltipPlacement;
  overlayClassName?: string;
  visible?: boolean;
  defaultVisible?: boolean;
}

export default class IApp extends React.Component<IAppProps> {
  static defaultProps = {
    defaultVisible: false,
  };

  constructor(props: IAppProps) {
    super(props);
  }

  public render() {
    const { text, details, antType, type, width, placement, overlayClassName, visible, defaultVisible } = this.props;
    const antIconType = antType ? antType : 'info-circle'; 
    const tooltipWidth = width ? width : 'auto';
    const position = placement ? placement : 'top';
    const setvisible = visible !== undefined ? {visible} : {};
    return (
      <span className={'abs-icon-tooltip'}>
        {text ? <span className="abs-text">{text}</span> : null}
        <Tooltip 
          overlayStyle={{'width': tooltipWidth }} 
          placement={position} 
          title={details} 
          arrowPointAtCenter={true} 
          overlayClassName={overlayClassName} 
          defaultVisible={defaultVisible}
          {...setvisible}
        >
          <span className="abs-icon-tooltip-icon-content">
          {
            type ? 
            <ABSIcon className="abs-icon" type={type} />
            :  
            <ABSAntIcon className="abs-icon" type={antIconType} />
          }
          </span>
        </Tooltip>
      </span>
    );
  }
}
