import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import './index.less';

export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface IABSTooltipProps {
  target: string | React.ReactNode;
  details: string | React.ReactNode;
  width?: number;
  placement?: TooltipPlacement;
  className?: string;
  visible?: boolean;
}

export default class ABSTooltip extends React.Component<IABSTooltipProps> {
  constructor(props: IABSTooltipProps) {
    super(props);
  }

  public render() {
    const { target, details, width, placement, className } = this.props;
    const tooltipWidth = width ? width : 'auto';
    const position = placement ? placement : 'top';
    const classes = classNames('abs-tooltip', className);
    // const obj = {
    //   points: ['tl', 'tr'],        // align top left point of sourceNode with top right point of targetNode
    //   offset: [10, 20],            // the offset sourceNode by 10px in x and 20px in y,
    //   targetOffset: ['30%', '40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
    //   overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
    // };
    return (
      <span className={classes}>
        <Tooltip
          overlayClassName={className}
          overlayStyle={{ 'width': tooltipWidth }}
          placement={position} title={details}
          arrowPointAtCenter={true} >
          <span style={{ display: 'inline-block' }}>
            {target}
          </span>
        </Tooltip>
      </span>
    );
  }
}