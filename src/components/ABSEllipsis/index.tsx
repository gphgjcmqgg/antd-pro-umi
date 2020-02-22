import React from 'react';
import { IEllipsis } from './util';
// import { Typography } from 'antd';
// import ABSParagraph from '../ABSParagraph';

// const { Paragraph } = Typography;

export interface IABSEllipsisProps {
  ellipsis?: boolean | IEllipsis;
}
 
export interface IABSEllipsisState {
  ellipsis: true;
}
 
class ABSEllipsis extends React.Component<IABSEllipsisProps, IABSEllipsisState> {
  // 次组件需要升级antd才可使用，至少为3.14.0

  static defaultProps = {
    ellipsis: true
  };
  render() { 
    // const { children, ellipsis } = this.props;
    return ( 
      // <div className="abs-ellipsis">
      //   <ABSParagraph>
      //     <Paragraph ellipsis={ellipsis}>{children}</Paragraph>
      //   </ABSParagraph>
      // </div>
      <div>次组件需要升级antd才可使用，至少为3.14.0</div>
     );
  }
}
 
export default ABSEllipsis;