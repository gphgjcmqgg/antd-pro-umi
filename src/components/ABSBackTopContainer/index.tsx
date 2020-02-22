import React from 'react';
import ABSBackTop from '../ABSBackTop';

export interface IABSBackTopContainerProps {
  containerIndex?: number;
  shareContent?: React.ReactNode;
}

export interface IABSBackTopContainerState {}

class ABSBackTopContainer extends React.Component<
  IABSBackTopContainerProps,
  IABSBackTopContainerState
> {
  static defaultProps = {
    containerIndex: 1
  };

  getDom = () => {
    const { containerIndex } = this.props;
    const container = document.getElementsByClassName('scrollbar-container');
    if (container.length > 0) {
      return container[containerIndex!] as HTMLElement;
    }
    return null;
  };

  render() {
    const { children, shareContent } = this.props;
    return (
      <div className="abs-backtop-container">
        {children}
        <ABSBackTop dom={this.getDom()} shareContent={shareContent} />
      </div>
    );
  }
}

export default ABSBackTopContainer;
