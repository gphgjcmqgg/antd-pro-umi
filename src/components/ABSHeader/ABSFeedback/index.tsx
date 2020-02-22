import * as React from 'react';
import './index.less';
import ABSIconTooltip from '../../ABSIconTooltip';
import ABSLink from '../../ABSLink';

interface IProps {
  to: string;
}

class ABSFeedback extends React.Component<IProps, any> {
  render() {
    const { to } = this.props;

    return (
      <div className="abs-feedback" >
        <ABSLink to={to}>
          <ABSIconTooltip type="question-o" details="帮助与反馈" />
        </ABSLink>
      </div>
    );
  }
}

export default ABSFeedback;
