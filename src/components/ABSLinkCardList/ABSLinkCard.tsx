import React from 'react';
import './ABSLinkCard.less';
import classnames from 'classnames';
import commonUtils from '../../utils/commonUtils';
import authService from '../../abs/services/auth/authService';

// tslint:disable-next-line:interface-name
export interface LinkCard {
  name: string | null;
  url: string | null;
  key: string;
  type: 'highlight'|'normal';
}

export const LinkCardBG = [
  'abs-link-list-item-flag-bg-blue-1',
  'abs-link-list-item-flag-bg-green-2',
  'abs-link-list-item-flag-bg-orange-3',
  'abs-link-list-item-flag-bg-blue-4',
  'abs-link-list-item-flag-bg-red-5',
  'abs-link-list-item-flag-bg-violet-6',
  'abs-link-list-item-flag-bg-violet-7',
  'abs-link-list-item-flag-bg-yellow-8',
  'abs-link-list-item-flag-bg-blue-9',
];

export interface IABSLinkCardProps {
  style?: React.CSSProperties;
  fontStyle?: React.CSSProperties;
  className?: string;
  item: LinkCard;
  currentColor: string;
  onShowMenuModal: () => void;
}

class ABSLinkCard extends React.Component<IABSLinkCardProps> {
  modal;
  goFunctionUrl = () => {
    const { item, onShowMenuModal } = this.props;
    const url = item.url ? item.url : '';
    if (item) {
      if (authService.hasPermission(item.key)) {
        location.href = commonUtils.parseUrl(url);
      } else {
        if (onShowMenuModal) {
          this.props.onShowMenuModal();
        }
      }
    }
  }
  render() {
    const { style, fontStyle, className, item, currentColor } = this.props;
    const classNames = classnames('abs-link-list-item-content', className);
    const containerClass = classnames('abs-link-list-item', currentColor, { 'abs-highlight-bg' : item.type === 'highlight'});
    return (
      <div className={containerClass} style={style} onClick={this.goFunctionUrl}>
        {
          item.url ?
            <>
              <div className="abs-link-list-item-flag" />
              <p className={classNames} style={fontStyle}>{item.name}</p>
            </>
            : null
        }
      </div>
    );
  }
}

export default ABSLinkCard;