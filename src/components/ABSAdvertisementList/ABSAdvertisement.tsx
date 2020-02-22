import React from 'react';
import ABSImage from '../ABSImage';
import ABSLink from '../ABSLink';
import { IABSAdvertisementData } from './util';

export interface IABSAdvertisementProps {
  advertisement: IABSAdvertisementData;
  width?: number | string;
  height?: number | string;
}

export interface IABSAdvertisementState {
}

class ABSAdvertisement extends React.Component<IABSAdvertisementProps, IABSAdvertisementState> {
  static defaultProps = {
    width: 220
  };
  
  render() {
    const { advertisement, width, height } = this.props;
    if (advertisement.linkUrl) {
      return (
        <ABSLink to={advertisement.linkUrl} target="_blank">
          <ABSImage
            title={advertisement.title}
            logo={`${advertisement.imageUrl}?w=${width}`}
            width={width}
            height={height}
          />
        </ABSLink>
      );
    } else {
      return (
        <ABSImage
          title={advertisement.title}
          logo={`${advertisement.imageUrl}?w=${width}`}
          width={width}
          height={height}
        />
      );
    }
  }
}

export default ABSAdvertisement;