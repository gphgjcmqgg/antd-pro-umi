import React, { ReactNode } from 'react';
import TagList from '../TagList';
import Footer from '../Footer';
import Header from '../Header';
import Container from '../Container';
import SelectField from '../SelectField';
import ExtraType from '../enums/ExtraType';
import FilterPanelType from '../enums/FilterPanelType';
import ABSLoading from '../../ABSLoading';
import FilterPanelModel from '../view_models/FilterPanelModel';
import FilterModel from '../view_models/FilterModel';
import './index.less';
import ABSIconText from '../../../components/ABSIconText';

export interface IABSFilterPanelProps {
  onClickItem: (model: FilterPanelModel) => void;
  onConfirm: (value: any) => void;
  onClose?: (flag: boolean) => void;
  onCancel?: () => void;
  type?: FilterPanelType;
  renderHeader?: () => ReactNode;
  renderFooter?: (() => ReactNode) | null;
  loading?: boolean;
  model: FilterPanelModel | null;
}

export interface IABSFilterPanelState {
  showFold?: boolean;
}

/**
 * 筛选面板（竖向）
 * @author peng.wu
 */
class FilterPanelVertical extends React.PureComponent<IABSFilterPanelProps, IABSFilterPanelState> {
  state = {
    showFold: false,
  };
  /**
   * 自定义头部
   */
  header: Header | null;

  /**
   * 自定义尾部
   */
  footer: Footer | null;

  /**
   * 获取附加视图（Header、Footer）数据
   * @param type 附加视图类型，例：机构排名页面Header、投资>一级、二级市场Footer
   * @deprecated 该接口在后期会被移除，不应依赖该接口
   */
  public getExtraValue(type: ExtraType) {
    if (type === ExtraType.organizationHeader && this.header) {
      const value = this.header.extraValue();
      return value;
    }
    return null;
  }

  render() {
    return (
      <Container
        onConfirm={this.onConfirm}
        onClose={this.onClose}
        onCancel={this.onCancel}
        className="filter-panel"
      >
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderShowSenior()}
        {this.renderFooter()}
      </Container>
    );
  }

  renderHeader() {
    const { type, renderHeader, model } = this.props;
    if (!model) { return null; }
    if (renderHeader) { return renderHeader(); }
    if (type !== FilterPanelType.organization) { return null; }
    return <Header ref={view => this.header = view} type={type}/>;
  }

  renderContent() {
    const { loading, model } = this.props;
    const { showFold } = this.state;
    if (loading) { return <ABSLoading />; }
    if (!model) { return null; }
    const { filters } = model;
    if (!Array.isArray(filters)) { return null; }
    return filters.map((filter, index) => {
      if (!filter) { return null; }
      filter.showFold = showFold;
      if (filter.isSelect) {
        return this.renderSelectField(index, filter);
      }
      if (filter.isCheckbox || filter.isRadio) {
        return this.renderTagList(index, filter);
      }
      return null;
    });
  }

  // 显示隐藏更多筛选
  showSeniorOption() {
    const { showFold } = this.state;
    this.setState({ showFold: !showFold});
  }

  renderShowSenior() {
    const { loading, model } = this.props;
    if (loading || !model) {
      return null;
    }
    let hasFoldOption = false;
    const { filters } = model;
    if (!Array.isArray(filters)) { return null; }
    filters.map((filter, index) => {
      if (filter.isFold) {
        hasFoldOption = true;
      }
    });
    if (!hasFoldOption) {
      return null;
    }
    const { showFold } = this.state; 
    if (showFold) {
      return (
        <div className="filter-panel-senior">
          <ABSIconText 
            containerClassName="filter-panel-senior-option-hide"
            icon="direction-up" text=""
            onClick={() => this.showSeniorOption()} />
        </div>
      );
    } else {
      return (
        <div className="filter-panel-senior">
          <ABSIconText 
            containerClassName="filter-panel-senior-option-show"
            className="filter-panel-senior-option-show-icon" 
            icon="direction-down" text="更多筛选"
            onClick={() => this.showSeniorOption()} />
        </div>
      );
    }
  }

  renderSelectField(index: number, filterModel: FilterModel) {
    return (
      <SelectField
        key={index}
        onClick={this.onClickItem}
        model={filterModel}
      />
    );
  }

  renderTagList(index: number, filterModel: FilterModel) {
    return (
      <TagList
        key={index}
        onClick={this.onClickItem}
        model={filterModel}
      />
    );
  }

  renderFooter() {
    const { type, renderFooter: rf, model } = this.props;
    if (!model) { return null; }
    if (rf !== undefined) {
      if (rf === null) { return null; }
      return rf();
    }
    if (type !== FilterPanelType.investment) { return null; }
    const { filters } = model;
    if (!Array.isArray(filters) || filters.length <= 0) { return null; }
    return <Footer ref={view => this.footer = view} />;
  }

  /**
   * 确认按钮点击回调
   */
  onConfirm = () => {
    const { model, onConfirm } = this.props;
    if (!model) { return; }
    let headerValue: any = null;
    let footerValue: any = null;
    if (this.header) { headerValue = this.header.extraValue(); }
    if (this.footer) { footerValue = this.footer.extraValue(); }
    const result = model.getRequestResult(headerValue, footerValue);
    onConfirm(result);
  }

  /**
   * 取消按钮点击回调
   */
  private onCancel = () => {
    const { onCancel, model, type } = this.props;
    if (type === FilterPanelType.organization && this.header) { this.header.initDateValue(); }
    if (this.footer) { this.footer.resetBuildDate(); }
    
    if (!model) { return; }
    if (onCancel) { onCancel(); }
  }

  /**
   * 展开/收起筛选面板侧边按钮点击回调
   */
  private onClose = (flag: boolean) => {
    const { onClose } = this.props;
    if (onClose) { onClose(flag); }
  }

  /**
   * 单选/多选筛选项点击回调
   */
  private onClickItem = (model: FilterModel, itemIndex: number) => {
    if (!model) { return; }
    const { model: filterPanelModel, onClickItem } = this.props;
    const { key } = model;
    if (!filterPanelModel) { return; }
    const updatedModel = filterPanelModel.updateFilters(key, itemIndex);
    const hasRelatedFilter = model.isMarketCategoryFilter || model.isProductCategoryFilter;
    const filteredModel = updatedModel.updateRelatedFilters(hasRelatedFilter);
    onClickItem(filteredModel);
  }
}

export default FilterPanelVertical;