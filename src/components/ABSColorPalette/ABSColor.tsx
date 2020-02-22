import React from 'react';
import './ABSColor.less';
import { IColorCard } from './util';
import classNames from 'classnames';
import ABSParagraph from '../ABSParagraph';

export interface IABSColorProps {
  colorCard: IColorCard;
}
 
class ABSColor extends React.Component<IABSColorProps> {
  render() { 
    const { colorCard } = this.props;
    const cardColor = colorCard.fontColor ? ('abs-color-block-' + colorCard.fontColor) : '';
    const isBorder = colorCard.color === '000000' ? 'abs-color-block-border' : '';
    const blockClasses = classNames('abs-color-block', cardColor, isBorder);
    const backgroundColor = colorCard.color.indexOf('#') === 0 ? colorCard.color : '#' + colorCard.color;
    return ( 
      <div className="abs-color">
        <div className={blockClasses} style={{ backgroundColor: backgroundColor }}>
          <div>{colorCard.color.replace('#' , '')}</div>
          {colorCard.text ? <div>{colorCard.text}</div> : null}
        </div>
        { colorCard.comment ?         
          <div className="abs-color-comment">
            <ABSParagraph>{colorCard.comment}</ABSParagraph>
          </div> : null 
        }
      </div>
     );
  }
}
 
export default ABSColor;