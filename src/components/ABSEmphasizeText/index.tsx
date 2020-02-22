import React from 'react';
import classNames from  'classnames';
import './index.less';

export interface IABSEmphasizeTextProps {
  title: string;
  style?: React.CSSProperties;
  hasColor?: boolean;
}
 
export interface IABSEmphasizeTextState {
  
}
 
class ABSEmphasizeText extends React.Component<IABSEmphasizeTextProps, IABSEmphasizeTextState> {
  static defaultProps = {
    hasColor: false,
  };
  render() { 
    const { style, title, hasColor } = this.props;
    const clazz = classNames('abs-emphasize-text', {'abs-money-red': hasColor});
    return <span className={clazz} style={{ ...style }}>{title}</span>;
  }
}
 
export default ABSEmphasizeText;