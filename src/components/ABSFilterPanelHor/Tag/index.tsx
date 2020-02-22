import React from 'react';
import './index.less';
import classNames from 'classnames';
import ITag from '../entities/ITag';

export interface ITagProps {
  tag: ITag;
  onClick: (tag: ITag) => void;
}
 
export interface ITagState {

}
 
class Tag extends React.Component<ITagProps, ITagState> {
  render() {
    const { tag: t, onClick } = this.props;
    const content = t ? t.content : '';
    const selected = t ? t.selected : '';
    const style = classNames('abs-multi-select', { 'abs-multi-select-selected': selected });
    return (
      <div className={style} onClick={() => onClick(t)}>
        {content}
      </div>
    );
  }
}
 
export default Tag;