import React from 'react';
import { Tooltip } from 'antd';
import ABSIcon from '../../ABSIcon';
import './index.less';
import { IFilterSelectItem } from './util';
import RouteConfig from '../../../abs/config/routeConfig';

export interface IFilterSelectProps {
  tooltipList?: Array<IFilterSelectItem>;
  filterLabel: string;
}

export interface IFilterSelectState {
}

class FilterSelect extends React.Component<IFilterSelectProps, IFilterSelectState> {

  showStatusTooltip = () => {
    const { tooltipList, filterLabel } = this.props;
    const tooltipLists = tooltipList ? tooltipList : [];
    return (
      <div>
      {
        tooltipLists.map((item, index) => {
          if (filterLabel !== item.short_name) {
            return <p key={item.security_id} onClick={() => this.onClickItem(item.security_id, item.short_name)} >{item.short_name}</p>;
          }
          return <p key={item.security_id}>{item.short_name}</p>;
        })
      }
      </div>
    );
  }

  onClickItem = (id, name) => {
    window.open(`${RouteConfig.investmentSecurityInfo + id}`);
  }

  render() {
    const { filterLabel } = this.props;
    return (
      <div className="security-header-filter">
        <span className="security-header-filter-laber">{filterLabel}</span>
        <Tooltip placement="bottomRight" title={this.showStatusTooltip()} overlayClassName="security-header-filter-operation">
          <span>
            <ABSIcon type="direction-down" className="direction-down-hover" />
          </span>
        </Tooltip>
      </div>
    );
  }
}

export default FilterSelect;