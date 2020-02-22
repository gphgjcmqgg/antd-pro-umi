import * as React from 'react';
import './ABSNews.less';

// tslint:disable-next-line:interface-name
export interface ABSNewsData {
    title: string;
    issuer: string;
    link: string;
  }
  
export interface IABSNewsValueProps {
    item: ABSNewsData;
  }
   
export interface IABSNewsValueState {
    
  }
   
class ABSNews extends React.Component<IABSNewsValueProps, IABSNewsValueState> {
    render() { 
      const { item } = this.props;
      return (
        <div className="news-outer-div">
            <a className="news-inner-title" href={item.link} target="_blank">
                {item.title}
            </a>
            <span className="news-inner-detail">
                {item.issuer}
            </span>
        </div>
      );
    }
  }
   
export default ABSNews;