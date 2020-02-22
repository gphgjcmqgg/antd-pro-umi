import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import './index.less';
import _ from 'lodash';

export interface IABSPerfectScrollBarProps {
  className?: string;
}

export interface IABSPerfectScrollBarState {}

class ABSPerfectScrollBar extends React.Component<
  IABSPerfectScrollBarProps,
  IABSPerfectScrollBarState
> {
  scrollBar;

  componentDidMount() {
    setTimeout(this.updateScrollBar, 1500);
    window.addEventListener('resize', _.debounce(this.updateScrollBar, 300));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => null);
  }

  updateScrollBar = () => {
    if (this.scrollBar) {
      this.scrollBar.updateScroll();
    }
  };

  render() {
    const { children, className } = this.props;
    const classes = classNames('scrollbar-container', className);
    if (commonUtils.isMobile.any()) {
      return (
        <div className={classes} style={{ overflow: 'scroll' }}>
          {children}
        </div>
      );
    }
    return (
      <PerfectScrollbar
        className={className}
        ref={view => (this.scrollBar = view)}
      >
        {children}
      </PerfectScrollbar>
    );
  }
}

export default ABSPerfectScrollBar;
