import React from 'react';
import {  Rate } from 'antd';
import './index.less';
export interface IABSRatingProps {
  style?: React.CSSProperties;
  className?: string;
  defaultValue?: number;
  value?: number;
  disabled?: boolean;
  allowHalf?: boolean;
  onChange?: (e: any) => void;
}

class ABSRating extends React.Component<IABSRatingProps> {
  render() {
    const { style, className, defaultValue, value, disabled, allowHalf, onChange } = this.props;
    return (
      <div className="abs-rate">
       <Rate 
        className={className}
        style={style}
        allowHalf={allowHalf}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled} 
        onChange={onChange}
        />
      </div>
    );
  }
}

export default ABSRating;