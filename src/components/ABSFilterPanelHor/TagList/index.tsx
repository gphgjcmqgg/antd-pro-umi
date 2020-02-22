import React from 'react';
import Tag from '../Tag';
import ITag from '../entities/ITag';
import ITagList from '../entities/ITagList';
import Title from '../../../abs/views/account/Resume/components/Title';
import './index.less';

export interface ITagListProps {
  onClick: (tag: ITag, id: number, index: number) => void;
  tagList: ITagList;
}

export interface ITagListState {

}

class TagList extends React.PureComponent<ITagListProps, ITagListState> {
  render() {
    const { tagList: t } = this.props;
    if (!t) { return null; }
    const { title, tags, id } = t;
    return (
      <div className="abs-filter-horizontal-tag-list">
        <Title className="abs-filter-horizontal-tag-list-title" textClassName="abs-filter-horizontal-tag-list-title-text">{title}</Title>
        <div className="abs-filter-horizontal-tag-list-item">
          {this.renderTags(tags, id)}
        </div>
      </div>
    );
  }

  renderTags(tags: ITag[], id: number) {
    const { onClick } = this.props;
    if (!Array.isArray(tags) || tags.length < 1) { return null; }
    return tags.map((tag, index) => {
      return (
        <Tag
          key={index}
          onClick={() => onClick(tag, id, index)}
          tag={tag}
        />
      );
    });
  }
}

export default TagList;