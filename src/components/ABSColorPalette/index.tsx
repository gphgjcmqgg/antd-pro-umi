import React from 'react';
import './index.less';
import ABSDescriptionContentTitle from '../ABSDescriptionContentTitle';
import { Row, Col } from 'antd';
import ABSColor from './ABSColor';
import { IColorCard } from './util';

export interface IABSColorPaletteProps {
  title?: string;
  description?: string | React.ReactNode;
  colorList: Array<IColorCard>;
  span?: number;
}
 
class ABSColorPalette extends React.Component<IABSColorPaletteProps> {
  renderColorRow(colorList: Array<IColorCard>) {
    const { span } = this.props;
    return (
      <Row>
        {
          colorList.map((item, index) => {
            return (
              <Col span={span ? span : 8} key={index}>
                <ABSColor colorCard={item} />
              </Col>
            );
          })
        }
      </Row>
    );
  }

  render() { 
    const { colorList, title, description } = this.props;
    return ( 
      <div className="abs-color-palette">
        <ABSDescriptionContentTitle title={title} description={description}>
          {this.renderColorRow(colorList)}
        </ABSDescriptionContentTitle>
      </div>
     );
  }
}
 
export default ABSColorPalette;