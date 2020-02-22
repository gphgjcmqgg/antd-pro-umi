import React from 'react';
import './ABSTimeLineBox.less';
import { ABSTag } from '../ABSTag';
import ABSParagraph from '../ABSParagraph';
// import ABSParagraph from '../ABSParagraph';
// export interface IVersionBoxItem {

// }
export interface IABSTimeLineBoxProps {
  content?: any;
  title: string;
  level: number;
}

class ABSTimeLineBox extends React.Component<IABSTimeLineBoxProps> {

  // renderContentItem(item: any, index: number) {
  //   var content: string = `${index + 1}、${item.content}`;
  //   return <ABSParagraph key={index}>{content}</ABSParagraph>;
  // }
  // renderList() {
  //   const { content } = this.props;
  //   if (content && content.length > 0) {
  //     return content.map((item, index) => {
  //       return this.renderContentItem(item, index);
  //     });
  //   }

  //   return null;
  // }

  render() {
    const { title, level, content } = this.props;
    const color = level > 1 ? '#1F98B8' : '#444C58';
    return (
      <div className="abs-timeline-box">
        <ABSTag content={title} color={color} visible={true} />
        <pre style={{ overflow: 'hidden' }}>
          <ABSParagraph>{content}</ABSParagraph>
        </pre>
      </div>
    );
  }
}

export default ABSTimeLineBox;