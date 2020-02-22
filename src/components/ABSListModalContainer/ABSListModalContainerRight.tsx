import React from 'react';
import ABSIcon from '../ABSIcon';
import './ABSListModalContainerRight.less';

export interface IABSListModalContainerRightProps {
  onClose: () => void;
}
 
export interface IABSListModalContainerRightState {
  
}
 
class ABSListModalContainerRight extends React.Component<IABSListModalContainerRightProps, IABSListModalContainerRightState> {
  render() { 
    const { children, onClose } = this.props;
    return (
      <div className="abs-list-modal-container-right">
        <ABSIcon className="abs-list-modal-container-right-close" type="close" onClick={onClose} />
        <div className="abs-list-modal-container-right-content">{children}</div>
      </div>
    );
  }
}
 
export default ABSListModalContainerRight;