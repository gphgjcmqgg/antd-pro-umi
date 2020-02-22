import React from 'react';
import './index.less';
import ABSIcon from '../ABSIcon';
// import ABSLink from '../ABSLink';

export interface IABSSwitchVersionProps {
  
}
 
export interface IABSSwitchVersionState {
  showSwitchVersion: boolean;
}
 
class ABSSwitchVersion extends React.Component<IABSSwitchVersionProps, IABSSwitchVersionState> {
  constructor(props: IABSSwitchVersionProps) {
    super(props);
    this.state = {
      showSwitchVersion: true,
    };
  }

  onClick = () => {
    this.setState({
      showSwitchVersion: false,
    });
  }

  render() { 
    const { showSwitchVersion } = this.state;
    if (showSwitchVersion) {
      return (
        <div className="abs-switch-version">
          <ABSIcon type="close" className="abs-switch-version-icon" onClick={this.onClick}/>
          <span className="abs-switch-version-text">
           <a target="_blank" href="https://v1.cn-abs.com">切换旧版</a> 
          </span>
        </div>
      );
    } 
    
    return null;
  }
}
 
export default ABSSwitchVersion;