import React from 'react';
import { ABSSwitch } from '../../../components/ABSSwitch';
import { FILTER_DEFAULT_SWITCH_OFF, FILTER_DEFAULT_SWITCH_ON } from '../../../utils/constant';
import './index.less';
import commonUtils from '../../../utils/commonUtils';

export interface IHeaderSwitchProps {
}
 
export interface IHeaderSwitchState {
  checked: boolean;
  // initChecked: boolean;
}
 
class HeaderSwitch extends React.Component<IHeaderSwitchProps, IHeaderSwitchState> {
  filterParms: any;
  constructor(props: any) {
    super(props);
    this.filterParms = commonUtils.getParams();
    let initChecked = FILTER_DEFAULT_SWITCH_OFF;
    if (this.filterParms.is_select_date && this.filterParms.is_select_date === 'true') {
      initChecked = FILTER_DEFAULT_SWITCH_ON;
    }
    this.state = {
      checked: initChecked,
    };
  }

  switchChange = (checked) => {
    this.setState({ checked: checked });
  }

  extraValue() {
    const { checked } = this.state;
    return {
      is_select_date: checked,
    };
  }

  render() { 
    const { checked } = this.state;
    return (
      <div className="abs-header-switch-panel">
        <div className="description">包含无发行日期</div>
        <ABSSwitch 
          type="on" 
          size="s" 
          disabled={false} 
          switchChangeFun={this.switchChange} 
          className="abs-header-switch"
          defaultChecked={checked}
        />
      </div>
    );
  }
}
 
export default HeaderSwitch;