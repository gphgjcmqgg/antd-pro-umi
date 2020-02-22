import React from 'react';
import { connect } from 'dva';
import echartRelationship from './chain';
import './index.less';
import commonUtils from '../../utils/commonUtils';

export interface IABSExpertChainProps {
  dispatch?: any;
  user?: any;
  expertResumeLink?: any;
}
 
export interface IABSExpertChainState {
  
}

const mapStateToProps = ({ account, global }) => {
  return {
    expertResumeLink: account.expertResumeLink,
    user: global.user,
  };
};

@connect(mapStateToProps)
class ABSExpertChain extends React.Component<IABSExpertChainProps, IABSExpertChainState> {
  componentDidMount() {
    const { dispatch, user } = this.props;
    let { id } = commonUtils.getParams();
    if (!id) {
      id = user.id;
    }

    dispatch({
      type: 'account/getExpertResumeLink',
      payload: {
        user_id: id,
      },
    });
  }

  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    const { expertResumeLink } = this.props;
    if (expertResumeLink !== prevProps.expertResumeLink) {
      // this.fetchData(this.props.userID);
      if (expertResumeLink.notes && expertResumeLink.links) {
        echartRelationship(this.props.expertResumeLink, false);
      } 
    }
  }

  render() { 
    return <div id="abs-expert-chain" />;
  }
}
 
export default ABSExpertChain;