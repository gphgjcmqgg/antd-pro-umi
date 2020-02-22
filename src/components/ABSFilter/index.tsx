import React from 'react';
import { updateFilterDataState } from './util';
import SingleSelectList from './SingleSelectList';
import FilterSectionConfig from '../ABSFilterPanel/dto/FilterSectionConfig';

export interface IABSFilterProps {
  config: FilterSectionConfig[];
  onClickItem: (value: FilterSectionConfig[]) => void;
}
 
export interface IABSFilterState {
  
}
 
class ABSFilter extends React.PureComponent<IABSFilterProps, IABSFilterState> {

  onClickItem = (sectionConfig: FilterSectionConfig, itemIndex: number) => {
    if (!sectionConfig) {
      return;
    }
    const { config, onClickItem } = this.props;
    const sectionKey = sectionConfig.key;
    const updatedData = updateFilterDataState(config, sectionKey, itemIndex);
    onClickItem(updatedData);
  }

  render() { 
    return (
      <>  
        {this.renderContent()}
      </>
    );
  }

  renderContent() {
    const { config } = this.props;
    if (!Array.isArray(config)) {
      return null;
    }
    return config.map((value, index, array) => {
      if (!value) {
        return null;
      }
      if (value.value === undefined) {
        return null;
      }

      return <SingleSelectList key={index} config={value} onClick={this.onClickItem} />;
    });
  }
}
 
export default ABSFilter;