import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface IABSHeaderSubTitleProps {
  subTitlelist: Array<React.ReactNode | string> ;
  className?: string;
}

class ABSHeaderSubTitle extends React.Component<IABSHeaderSubTitleProps> {
  render() {
    const { subTitlelist, className } = this.props;
    const classes = classNames('abs-header-subtitle', className);
    const subTitleItems = subTitlelist ? subTitlelist : [];
    return (
      <div className={classes}>
        {
          subTitleItems.map((item, index) => {
            return <div className="abs-header-subtitle-item" key={index}>{item}</div>;
          })
        }
      </div>
    );
  }
}

export default ABSHeaderSubTitle;