import React from 'react';
import './index.less';

export interface IABSBadgeProps {
  count?: number;
  children: React.ReactNode;
}

export default class ABSBadge extends React.Component<IABSBadgeProps, any> {
  public render() {
    const {count, children} = this.props;
    return (
      <div className="abs-badge">
        {count != null ? 
         (count === 0 ? null : <div className="abs-reddot" />)
         : <div className="abs-reddot" />
        }
        <div className="abs-badge-children">{children}</div>
        <span>{count ? `（${count}）` : null}</span>
      </div>
    );
  }
}
