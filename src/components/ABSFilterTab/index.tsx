import React from 'react';
import ABSFilter from '../../components/ABSFilter';
import { FilterTabList, getFilteItem, getSelectedFilterKey  } from './util';
import FilterSectionConfig from '../../components/ABSFilterPanel/dto/FilterSectionConfig';
import './index.less';

export interface IABSFilterTabProps {
  filterTabList: FilterTabList[];
  selectedKey?: string;
}

export interface IABSFilterTabState {
  filterData: Array<any>;
  selectedKey: string;
}

class ABSFilterTab extends React.PureComponent<IABSFilterTabProps, IABSFilterTabState> {
  constructor(props: any) {
    super(props);
    const { filterTabList, selectedKey } = this.props;
    this.state = {
      filterData: getFilteItem(filterTabList[0]),
      selectedKey: selectedKey || '',
    };
  }

  setFilterTabContent = () => {
    const { filterTabList } = this.props;
    const { selectedKey } = this.state;
    let showContent;
    if (selectedKey) {
      for (var i = 0; i < filterTabList[0].list.length; i++) {
        const item = filterTabList[0].list[i];
        if (item.filter.key === selectedKey) {
          showContent = item.content;
          return showContent;
        }
      }
      // filterTabList[0].list.map((item, index) => {
      //   if (item.filter.key === selectedKey) {
      //     showContent = item.content;
      //   }
      // });
      return showContent;
    }
    showContent = filterTabList[0].list[0].content;
    return showContent;
  }

  onClickItem = (value: FilterSectionConfig[]) => {
    const key = getSelectedFilterKey(value);
    this.setState({ filterData: value, selectedKey: key });
  }

  render() {
    const { filterData } = this.state;
    return (
      <div className="abs-filter-tab">
        <ABSFilter
          config={filterData}
          onClickItem={this.onClickItem}
        />
        <div className="abs-filter-tab-content">
          {this.setFilterTabContent()}
        </div>
        
      </div>
    );
  }
}

export default ABSFilterTab;