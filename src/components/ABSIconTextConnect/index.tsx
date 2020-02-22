import React from 'react';
import './index.less';
import classNames from 'classnames';
import ABSIconText from '../ABSIconText';

export interface IABSIconText {
  icon: string;
  text: string;
  className?: string;
  containerClassName?: string;
  onClick?: (event: React.MouseEvent<any>) => void;
}
export interface IABSIconTextConnectProps {
  iconTextList: IABSIconText[];
  className?: string;
}

class ABSIconTextConnect extends React.Component<IABSIconTextConnectProps> {
  public static defaultProps = {
    iconTextList: [],
  };
  renderIconText = (item, index) => {
    if (index && item) {
      return (
        <>
          <span className="abs-icon-text-connect-line" />
          <div className="abs-icon-text-connect-content">
            <ABSIconText 
              className={classNames(item.className)} 
              containerClassName={classNames(item.containerClassName)} 
              icon={item.icon} 
              text={item.text} 
              onClick={item.onClick} 
            />
          </div>
        </>
      );
    }
    return (
    <div className="abs-icon-text-connect-content">
      <ABSIconText 
        className={classNames(item.className)} 
        containerClassName={classNames(item.containerClassName)} 
        icon={item.icon} 
        text={item.text} 
        onClick={item.onClick} 
      />
    </div>
    );
  }
  render() {
    const { iconTextList, className } = this.props;
    const classes = classNames('abs-icon-text-connect', className);
    return (
      <div className={classes}>
        {
          iconTextList.map((item, index) => {
           return this.renderIconText(item, index);
          })
        }
      </div>
    );
  }
}

export default ABSIconTextConnect;