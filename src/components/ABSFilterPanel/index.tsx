import React, { ReactNode } from 'react';
import FilterPanelType from './enums/FilterPanelType';
import FilterSectionConfig from './dto/FilterSectionConfig';
import FilterPanelVertical from './FilterPanelVertical';
import ExtraType from './enums/ExtraType';
import FilterPanelModel from './view_models/FilterPanelModel';
import FilterPanelResult from './dto/FilterPanelResult';

export interface IABSFilterPanelProps {
  onConfirm: (value: any) => void;
  onClose?: (flag: boolean) => void;
  onCancel?: () => void;
  type?: FilterPanelType;
  renderHeader?: () => ReactNode;
  renderFooter?: (() => ReactNode) | null;
  loading?: boolean;
}

export interface IABSFilterPanelState {
  model: FilterPanelModel | null;
}

/**
 * 筛选面板（竖向）
 * @author peng.wu
 */
class ABSFilterPanel extends React.PureComponent<IABSFilterPanelProps, IABSFilterPanelState> {
  state = {
    model: null,
  };

  filterPanel: FilterPanelVertical | null;

  /**
   * 初始 model
   */
  private originalModel: FilterPanelModel | null;

  /**
   * 获取附加视图（Header、Footer）数据
   * @param type 附加视图类型，例：机构排名页面Header、投资>一级、二级市场Footer
   */
  getExtraValue(type: ExtraType) {
    if (this.filterPanel) { return this.filterPanel.getExtraValue(type); }
    return null;
  }

  /**
   * 刷新
   * @param config 
   * @param completeHander 
   */
  reload(config: FilterSectionConfig[], completeHander?: (result: FilterPanelResult | null) => void) {
    const model = FilterPanelModel.from(config);
    if (!model) { return; }
    const filteredModel = model.updateRelatedFilters(true);
    this.originalModel = filteredModel;
    this.setState({ model: filteredModel });
    const result = model.getRequestResult();
    if (completeHander) { completeHander(result); }
  }

  render() {
    const { model } = this.state;
    return (
      <FilterPanelVertical
        {...this.props}
        ref={view => this.filterPanel = view}
        model={model}
        onClickItem={this.onClickItem}
        onCancel={this.onCancel}
      />
    );
  }

  private onClickItem = (model: FilterPanelModel) => {
    this.setState({ model });
  }

  private onCancel = () => {
    this.setState({ model: this.originalModel });
    const { onCancel: oc } = this.props;
    if (oc) { oc(); }
  }
}

export default ABSFilterPanel;