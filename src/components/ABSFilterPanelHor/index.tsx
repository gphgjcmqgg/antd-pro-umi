import React from 'react';
import TagList from './TagList';
import ITag from './entities/ITag';
import Container from './Container';
import DefaultTagList from './entities/impl/DefaultTagList';
import DefaultSelectList from './entities/impl/DefaultSelectList';
import IFilter from './entities/IFilter';
import ISelectList from './entities/ISelectList';
import ITagList from './entities/ITagList';
import IFilterService from './services/IFilterService';
import './index.less';
import { ABSButton } from '../ABSButton';
import ABSSelectField from '../ABSSelectField';
import ABSMessage from '../ABSMessage';
import classNames from 'classnames';
import _ from 'lodash';

export interface IABSFilterPanelHorProps {
  filterService: IFilterService;
  onConfirm?: (result: any) => void;
  onCancel?: () => void;
  contentClassName?: string;
  hideCancelBtn?: boolean;
  hideSelectAllBtn?: boolean;
  selectListClassName?: string;
  selectTextClassName?: string;
  buttonContainerClassName?: string;
  onSelectChange?: (id: number, value: number) => void;
}

export interface IABSFilterPanelHorState {
  data: IFilter[] | null;
  selected: boolean;
}

/** 筛选面板（横向） */
class ABSFilterPanelHor extends React.PureComponent<IABSFilterPanelHorProps, IABSFilterPanelHorState> {
  static defaultProps = {
    hideSelectAllBtn: true,
  };

  state = {
    data: null,
    selected: false,
  };

  /** 筛选数据 */
  private data: IFilter[];

  /** filter service  */
  private filterService: IFilterService;

  constructor(props: IABSFilterPanelHorProps) {
    super(props);
    const { filterService: fs } = props;
    this.filterService = fs;
  }

  render() {
    const { contentClassName } = this.props;
    const { data } = this.state;
    if (!Array.isArray(data) || data.length < 1) { return null; }
    return (
      <Container
        contentClassName={contentClassName}
        renderFooter={this.renderButtons}
      >
        <div className="abs-filter-panel-horizontal-select-list-container">
          {this.renderSelectLists()}
        </div>
        {this.renderTagLists()}
      </Container>
    );
  }

  renderButtons = () => {
    const { buttonContainerClassName } = this.props;
    const className = classNames('abs-filter-panel-horizontal-buttons', buttonContainerClassName);
    return (
      <div className={className}>
        <ABSButton
          onClick={this.onConfirm}
          key="submit"
          type="primary"
          icon="check"
        >
          确定
        </ABSButton>
        {this.renderCancelButton()}
        {this.renderSelectAllButton()}
      </div>
    );
  }

  renderCancelButton() {
    const { hideCancelBtn: hide } = this.props;
    if (hide) { return null; }
    return (
      <ABSButton
        onClick={this.onCancel}
        key="return"
        type="default"
        icon="close"
        style={{ marginLeft: '10px' }}
      >
        取消
      </ABSButton>
    );
  }

  renderSelectAllButton() {
    const { hideSelectAllBtn: hide } = this.props;
    if (hide) { return null; }
    const { selected } = this.state;
    const selectTitle = selected ? '取消全选' : '全选';
    return (
      <ABSButton
        onClick={this.onSelectAll}
        key="return"
        type="primary"
        absIcon="select-all"
        style={{ marginLeft: '10px' }}
      >
        {selectTitle}
      </ABSButton>
    );
  }

  renderSelectLists() { 
    const { data } = this.state;
    if (!Array.isArray(data)) { return null; }
    return data.map((filter) => {
      if (filter instanceof DefaultSelectList) {
        return this.renderSelectList(filter);
      }
      return null;
    });
  }

  renderTagLists() {
    const { data } = this.state;
    if (!Array.isArray(data)) { return null; }
    return data.map((filter) => {
      if (filter instanceof DefaultTagList) {
        return this.renderTagList(filter);
      }
      return null;
    });
  }

  renderSelectList(s: ISelectList) {
    const { selectTextClassName } = this.props;
    const { title, options, id, value: selectedValue } = s;
    const textClazzName = classNames('abs-filter-panel-horizontal-select-title-text', selectTextClassName);
    return (
      <ABSSelectField
        key={id}
        title={title}
        selectOptions={options}
        onChange={(value: number) => this.onSelectChange(id, value)}
        defaultValue={selectedValue}
        className="abs-filter-panel-horizontal-select"
        textClassName={textClazzName}
      />
    );
  }

  renderTagList(t: ITagList) {
    return (
      <TagList
        onClick={this.onClickTag}
        tagList={t}
      />
    );
  }

  /**
   * 刷新筛选面板
   * @param response HTTP请求响应数据
   */
  public reload(response: any) {
    const fs = this.filterService;
    this.data = fs.format(response);
    this.setState({ data: this.data });
  }

  /** Tag点击回调 */
  private onClickTag = (tag: ITag, id: number, index: number) => {
    const fs = this.filterService;
    this.data = fs.updateState(this.data, id, index, -1);
    const d = this.data;
    let selected = false;
    if (fs.hasSelectedTag) { selected = fs.hasSelectedTag(d); }
    this.setState({
      data: this.data,
      selected,
    });
  }

  /** Select点击回调 */
  private onSelectChange = (id: number, value: number) => {
    const fs = this.filterService;
    this.data = fs.updateState(this.data, id, -1, value);
    const d = this.data;
    let selected = false;
    if (fs.hasSelectedTag) { selected = fs.hasSelectedTag(d); }
    this.setState({
      data: this.data,
      selected,
    });
    const { onSelectChange: osc} = this.props;
    if (osc) { osc(id, value); }
  }

  /** 确认按钮点击回调 */
  private onConfirm = () => {
    const fs = this.filterService;
    fs.getSelectedResult(this.data)
      .then((result: any[]) => {
        const { onConfirm: oc } = this.props;
        if (oc) { oc(result); }
      })
      .catch((error: Error) => {
        if (!error) { return; }
        ABSMessage.error(error.message);
      });
  }

  /** 取消按钮点击回调 */
  private onCancel = () => {
    const fs = this.filterService;
    if (fs.reset) { fs.reset(); }
    const f = fs.originalFilters;
    if (!f) { return; }
    this.data = _.cloneDeep(f);
    this.setState({ data: this.data });
  }

  /** 全选/取消全选 按钮点击回调 */
  private onSelectAll = () => {
    const fs = this.filterService;
    const d = this.data;
    let selected = false;
    if (fs.hasSelectedTag) { selected = !fs.hasSelectedTag(d); }
    if (fs.switchAllState) { this.data = fs.switchAllState(d, selected); }
    this.setState(prevState => {
      return {
        data: this.data,
        selected: !prevState.selected,
      };
    });
    const { onCancel: oc } = this.props;
    if (oc) { oc(); }
  }
}

export default ABSFilterPanelHor;