import React from 'react';
import ABSParagraph from '../ABSParagraph';
import ABSLink from '../ABSLink';
import routeConfig from '../../abs/config/routeConfig';

export interface IABSNotSupportProps {
  message?: string;
  hideConcatUs?: boolean;
}

class ABSNotSupport extends React.Component<IABSNotSupportProps> {
  static defaultProps = {
    message: '',
    hideConcatUs: false,
  };

  renderConcatUs() {
    const { hideConcatUs } = this.props;
    if (!hideConcatUs) {
      return (
        <span>
          <span>{'，如有疑问请'}</span>
          <ABSLink
            to={routeConfig.feedback}
            target="_blank"
            children={<span className="abs-link-url">{'联系我们'}</span>}
          />
        </span>
      );
      // '，我们的联系方式： 电话 021-31156258；邮箱 feedback@cn-abs.com';
    }
    return null;
  }

  render() {
    const { message } = this.props;
    return (
      <ABSParagraph style={{ padding: 26 }}>
        {message}
        {this.renderConcatUs()}
      </ABSParagraph>
    );
  }
}

export default ABSNotSupport;
