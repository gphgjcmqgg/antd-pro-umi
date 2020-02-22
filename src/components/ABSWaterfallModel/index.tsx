import React from 'react';
import { connect } from 'dva';
import { cashflowChart } from './jsplumb';
import shallowEqual from 'shallowequal';
import './index.less';

export interface IABSWaterfallModelProps {
  model: any;
  effects: string;
  dispatch: any;
  payload?: any;
  config: any;
}
 
export interface IABSWaterfallModelState {
  
}
 
class ABSWaterfallModel extends React.Component<IABSWaterfallModelProps, IABSWaterfallModelState> {
  componentDidMount() {
    const { payload, effects } = this.props;
    this.props.dispatch({ type: effects, payload: payload });
  }

  componentDidUpdate(prevProps: any) {
    const { config } = this.props; 
    if (!shallowEqual(this.props.config, prevProps.config) && config !== null) {
      cashflowChart(config);
    }
  }

  render() { 
    return ( 
      <div id="waterfall" className="abs-waterfall-model" />
     );
  }
}
 
function getData(state: any, model: any) {
  const keys = Object.keys(model);
  const config = state[model[keys[0]]] || {};
  return { config };
}

function mapStateToProps(state: any, { namespace, model }: any) {
  const stateOfNamespace = state[namespace];
  if (model) {
    const { config } = getData(stateOfNamespace, model);

    return { config };
  }
  return { config: {} };
}

export default connect(mapStateToProps)(ABSWaterfallModel);