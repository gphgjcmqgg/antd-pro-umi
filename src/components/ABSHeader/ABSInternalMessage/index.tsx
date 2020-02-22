import * as React from 'react';
import { connect } from 'dva';
import ABSIconTooltip from '../../ABSIconTooltip';
import './index.less';
import routeConfig from '../../../abs/config/routeConfig';
import { setMessageUnreadCount } from '../../../abs/views/account/InternalMessage/entities/data';
import {
  INTERNAL_MESSAGE_DISPATCH_INTERVAL,
  INTERNAL_MESSAGE_COUNI_SHOW_TIMEOUT
} from '../../../utils/constant';

export interface IABSInternalMessageProps {
  dispatch?: any;
  internalMessageUnreadCount?: any;
  filterReadStatus: string;
}
export interface IABSInternalMessageState {
  visible: boolean;
  detail: string;
}

class ABSInternalMessage extends React.Component<
  IABSInternalMessageProps,
  IABSInternalMessageState
  > {
  defaultDetails = '站内信息';
  delayTimer;
  timer;

  constructor(props: IABSInternalMessageProps) {
    super(props);
    // 每次进来的时候 清空internalMessageUnreadCount 防止进入黑屏页面 返回的时候无法显示您有多少条消息的提示
    props.internalMessageUnreadCount = null;
    this.state = {
      visible: false,
      detail: this.defaultDetails
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setMessageUnreadCount(dispatch);
    this.timer = setInterval(() => {
      setMessageUnreadCount(dispatch);
    }, INTERNAL_MESSAGE_DISPATCH_INTERVAL);
  }

  componentWillReceiveProps(nextProps: IABSInternalMessageProps) {
    const { internalMessageUnreadCount } = this.props;
    if (
      nextProps.internalMessageUnreadCount !== null &&
      nextProps.internalMessageUnreadCount.count !== null
    ) {
      if (
        internalMessageUnreadCount !== null &&
        internalMessageUnreadCount.count ===
        nextProps.internalMessageUnreadCount.count
      ) {
        return;
      }
      if (nextProps.internalMessageUnreadCount.count === 0) {
        this.setState({
          visible: false,
          detail: this.defaultDetails
        });
        return;
      }
      this.setState(
        {
          visible: true,
          detail: `您有${nextProps.internalMessageUnreadCount.count}条新消息`
        },
        () => {
          this.delayTimer = setTimeout(() => {
            this.setState({
              visible: false
            });
          }, INTERNAL_MESSAGE_COUNI_SHOW_TIMEOUT);
        }
      );
      this.newAlerts(nextProps.internalMessageUnreadCount.count);
    }
  }

  newAlerts = (count) => {
    let oldTitle = document.title;
    let msg = `您有${count}条新消息`;
    let timeoutId;
    let clear = function () {
      clearInterval(timeoutId);
      document.title = oldTitle;
      window.onmousemove = null;
      timeoutId = null;
    };
    let timesRun;
    timesRun = 0;
    let blink = function () {
      document.title = document.title === msg ? oldTitle : msg;
      timesRun += 1;
      if (timesRun > 10) {
        clear();
      }
    };

    if (!timeoutId) {
      timeoutId = setInterval(blink, 1000);
      window.onmousemove = clear;
    }
  };

  onMouseOver = () => {
    clearTimeout(this.delayTimer);
    this.setState({ visible: true });
  };

  onMouseLeave = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 300);
  };

  onClick = () => {
    if (
      window.location.hash.indexOf('#/user/internal-message/receive') !== -1
    ) {
      this.props.dispatch({
        type: 'account/triggerUpdateFilterReadStatus',
        payload: {
          filterReadStatus: this.props.filterReadStatus
        }
      });
      return;
    }
    window.location.href = routeConfig.internalMessage;
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { internalMessageUnreadCount } = this.props;
    const { visible, detail } = this.state;
    const newCount = internalMessageUnreadCount
      ? internalMessageUnreadCount.count
      : 0;
    return (
      <div className="abs-internal-message">
        <div
          style={{ display: 'inline-block', marginTop: 1, marginLeft: 4 }}
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
        >
          <ABSIconTooltip type="email-m" details={detail} visible={visible} overlayClassName="abs-header-internal-message-bell" />
          {newCount === 0 ? '' : <span className="abs-message-count" />}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    ...state.account,
    internalMessageUnreadCount: state.global.internalMessageUnreadCount,
    filterReadStatus: state.account ? state.account.filterReadStatus : ''
  };
}

export default connect(mapStateToProps)(ABSInternalMessage);
