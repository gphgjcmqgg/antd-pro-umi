import React from 'react';
import ABSContainer from '../ABSContainer';
import ABSPanel from '../ABSPanel';
import ABSPagination from '../ABSPagination';
import ABSNoContent from '../ABSNoContent';
import ABSFileList from '../ABSFileList';
import { connect } from 'dva';
import _ from 'lodash';
import './index.less';

export interface IABSNewsListContainerProps {
  className?: string;
  actionType: string;
  title: string;
  payload: Object;
  model: string;

  loading?: boolean;
  newsList?: INewsList;
  renderRow: (item: any) => Object;
  dispatch?: any;
}

interface INewsList {
  items: INewsListItem[];
}
interface INewsListItem {
  title: string;
  source: string;
  publishDate: string;
  url: string;
}

export interface IABSNewsListContainerState {}

class ABSNewsListContainer extends React.Component<
  IABSNewsListContainerProps,
  IABSNewsListContainerState
> {
  componentDidMount() {
    const { dispatch, payload, actionType } = this.props;
    dispatch({
      type: actionType,
      payload: { ...payload, page_index: 1 }
    });
  }

  renderList() {
    const { newsList, loading, renderRow } = this.props;
    if (!newsList || !newsList.items || newsList.items.length === 0) {
      return <ABSNoContent />;
    }

    let data: any = newsList.items.map((item, index) => {
      return renderRow(item);
    });
    return <ABSFileList list={data} loading={loading} pageSize={10} />;
  }

  render() {
    const { title, actionType, payload, model } = this.props;
    return (
      <div className="abs-news-list-container">
        <ABSContainer
          className="abs-news-list-container-warpper"
          removePerfectScrollBar={true}
        >
          <ABSPanel title={title} removePadding={true} hasBorder={true}>
            {this.renderList()}
          </ABSPanel>
        </ABSContainer>
        <div className="abs-list-container-footer">
          <ABSPagination
            className="abs-deal-list-pagination"
            actionType={actionType}
            payload={payload}
            model={model}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { model }) => {
  const loading = _.get(state, 'loading.models.market', false);
  return {
    loading,
    newsList: _.get(state, model)
  };
};
export default connect(mapStateToProps)(ABSNewsListContainer);
