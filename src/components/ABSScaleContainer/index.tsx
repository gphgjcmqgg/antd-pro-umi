import React from 'react';
import './index.less';
import { Row, Col } from 'antd';

export interface IABSScaleContainerProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  middleContent?: React.ReactNode;
  leftSpan?: number;
  rightSpan?: number;
  middleSpan?: number;
  // hasBorder?: [boolean, boolean];
  className?: string;
}
 
class ABSScaleContainer extends React.Component<IABSScaleContainerProps> {
  defaultSpan: number = 12;

  // hasBorder(border: string) {
  //   const { hasBorder } = this.props;
  //   if (hasBorder) {
  //     let nowBorde = false;
  //     if (border === 'left') {
  //       nowBorde = hasBorder[0];
  //     } else {
  //       nowBorde = hasBorder[1];
  //     }
  //     return nowBorde ? 'abs-double-container-col-border' : '';
  //   }
  //   return '';
  // }

  renderCol(content?: React.ReactNode, span?: number) {
    const spanNew = span ? span : this.defaultSpan;
    if (content) {
      return <Col span={spanNew} className="abs-double-container-col">{content}</Col>;
    }
    return '';
  }

  render() { 
    const { leftContent, rightContent, middleContent,
      leftSpan, rightSpan, middleSpan, className,
    } = this.props;
    if (middleContent) {
      this.defaultSpan = 8;
    }
    const classs = `abs-double-container ${className}`;
    // const leftBorder = this.hasBorder('left');
    // const rightBorder = this.hasBorder('right');
    // const leftClass = `abs-double-container-col abs-double-container-col-left`;
    // const rightClass = `abs-double-container-col abs-double-container-col-right`;
    return (
      <Row className={classs}>
        {this.renderCol(leftContent, leftSpan)}
        {this.renderCol(middleContent, middleSpan)}
        {this.renderCol(rightContent, rightSpan)}
      </Row>
    );
  }
}
 
export default ABSScaleContainer;