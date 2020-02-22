import React from 'react';
import './index.less';
import classNames from 'classnames';

export interface IABSCommentProps {
  children: React.ReactNode|string;
  className?: string | null;
}

export default class ABSComment extends React.Component<IABSCommentProps> {
  public render() {
    const {children, className} = this.props;
    const clazz = classNames('abs-comment', className);
    return (
      <div className={clazz}>
        {children}
      </div>
    );
  }
}
