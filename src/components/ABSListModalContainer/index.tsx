import React from 'react';
import ABSListContainer from '../ABSListContainer';
import ABSListModalContainerRight from './ABSListModalContainerRight';
import './index.less';

export interface IABSListModalContainerProps {
  title: string;
  columnsData: any;
  actionType: string;
  payload: Object;
  model: string;
  onRow?: (record: any, index: number) => void;
  renderRight: (record: any) => React.ReactNode;
  defaultSelectedIndex?: number;
}
 
export interface IABSListModalContainerState {
  
}
 
class ABSListModalContainer extends React.Component<IABSListModalContainerProps, IABSListModalContainerState> {
  static defaultProps = {
    defaultSelectedIndex: 0,
  };

  state = {
    showRight: false,
    record: null,
  };

  onClose = () => {
    const { showRight } = this.state;
    this.setState({ showRight: !showRight });
  }

  onRow = (record: any, index: number) => {
    const { defaultSelectedIndex } = this.props;
    if (index === defaultSelectedIndex) {
      if (!this.state.record) {
        this.setState({ showRight: true, record });
      }
    }

    return {
      onClick: () => {
        const { onRow } = this.props;
        if (onRow) {
          onRow(record, index);
        }
        this.setState({ showRight: true, record });
      }
    };
  }

  renderRight() {
    const { renderRight } = this.props;
    const { showRight, record } = this.state;
    if (showRight) {
      return (
        <ABSListModalContainerRight onClose={this.onClose}>
          {renderRight(record)}
        </ABSListModalContainerRight>
      );
    }
    return null;
  }

  render() { 
    const { columnsData, title, actionType, payload, model } = this.props;
    return (
      <div className="abs-list-modal-container">
        <div className="abs-list-modal-container-left">
          <ABSListContainer
            title={title}
            columnsData={columnsData} 
            actionType={actionType}
            payload={payload}
            model={model}
            onRow={this.onRow}
            selectable={true}
          />
        </div>
        {this.renderRight()}
      </div>
    );
  }
}
 
export default ABSListModalContainer;