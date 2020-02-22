import React from 'react';
import { Carousel } from 'antd';
import './index.less';

export interface IABSCarouselProps {
  autoplay?: boolean;
}
 
export interface IABSCarouselState {
  
}
 
class ABSCarousel extends React.Component<IABSCarouselProps, IABSCarouselState> {
  static defaultProps = {
    autoplay: true,
  };

  render() { 
    const { autoplay, children } = this.props;
    const autoplayNew = autoplay === false ? autoplay : true;
    return ( 
      <div className="abs-carousel">
        <Carousel autoplay={autoplayNew}>
          {children}
        </Carousel>
      </div>
     );
  }
}
 
export default ABSCarousel;