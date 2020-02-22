import React from 'react';
import { IABSAdvertisementData } from './util';
import ABSAdvertisement from './ABSAdvertisement';

// tslint:disable-next-line:interface-name
export interface IABSAdvertisementListProps {
  advertisements: Array<IABSAdvertisementData>;
}

export interface IABSAdvertisementListState {
}

class ABSAdvertisementList extends React.Component<IABSAdvertisementListProps, IABSAdvertisementListState> {
  static defaultProps = {
  };

  renderAdvertisementList() {
    const {
      advertisements,
    } = this.props;
    return advertisements.map((element) => (
      <div style={{ marginBottom: 20 }} key={element.title}>
        <ABSAdvertisement advertisement={element} width={220} />
      </div>
    ));
  }

  render() {
    return (
      <div className={`abs-home-page-advertisement`}>
        {this.renderAdvertisementList()}
      </div>
    );
  }
}

export default ABSAdvertisementList;