import React, { ReactNode } from 'react';
import './index.less';
import classNames from 'classnames';

export interface IContainerProps {
  contentClassName?: string;
  renderFooter: () => ReactNode;
}

export interface IContainerState {

}

class Container extends React.PureComponent<IContainerProps, IContainerState> {
  render() {
    const { children, contentClassName, renderFooter } = this.props;
    const contentClazzName = classNames('abs-filter-horizontal-continer-content', contentClassName);
    return (
      <div className="abs-filter-horizontal-continer">
        <div className={contentClazzName}>
          {children}
        </div>
        {renderFooter()}
      </div>
    );
  }
}

export default Container;