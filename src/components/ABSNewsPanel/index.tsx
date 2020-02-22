import React from 'react';
import classNames from 'classnames';
import './index.less';
import ABSImage from '../../components/ABSImage';
import ABSLink from '../../components/ABSLink';
import routeConfig from '../../abs/config/routeConfig';

const image = require('../../assets/images/fire.png');

export interface IABSPanelProps {
  // 是否去除内边距
  removePadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
  bottomText?: string;
  id?: string;
  news_type_id: number;
  url: string;
  isHideHot?: boolean;
}

class ABSNewsPanel extends React.Component<IABSPanelProps> {
  static defaultProps = {
    removePadding: false,
  };

  render() {
    const { children, style, className, 
      removePadding, bottomText, id, 
      news_type_id, url, isHideHot
    } = this.props;
    const classes = classNames('abs-news-panel', className, {
      'abs-panel-no-padding': removePadding,
    });
    let newsUrl: string = '';
    switch (news_type_id) {
      case 0:
        newsUrl = url;
        break;
      case 1:
        newsUrl = `${routeConfig.newsDetail}?type=domestic&id=${id}&news_type_id=${news_type_id}`;
        break;
      case 2:
        newsUrl = `${routeConfig.newsDetail}?type=overseas&id=${id}&news_type_id=${news_type_id}`;
        break;
      case 3:
        newsUrl = routeConfig.lawPolicyDetail + id;
        break;
      default:
        break;
    }
    return (

      <div className={classes} >
        <ABSLink to={newsUrl} target="_blank">
          <div className="abs-panel-content" style={{ ...style }}>
            <div className="abs-panel-heard-text">
              {isHideHot ? <div style={{width: 16, display: 'inline-block'}} /> : <ABSImage logo={image} width={16} />}
              <p className="abs-panel-children">{children}</p>
            </div>
            <div className="abs-panel-bottom-text">
              {bottomText}
            </div>
          </div>
        </ABSLink>
      </div>

    );
  }
}

export default ABSNewsPanel;
